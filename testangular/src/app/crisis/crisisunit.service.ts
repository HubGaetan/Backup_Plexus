import { Injectable } from '@angular/core';
import { crisisunitmodel } from '../model/crisisunitmodel';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { membermodel } from '../model/membermodel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrisisunitService {
  private memberslist: crisisunitmodel[] = [];

  private link = 'http://localhost:3000/crisisunits';

  private memberlink = 'http://localhost:3000/members';
  constructor(private http: HttpClient) { }



  getCrisisunitlist(): Observable<crisisunitmodel[]> {
    // return this.crisislist;
    return this.http.get<crisisunitmodel[]>(this.link);
  }

  getMembersbyCrisisId(crisisId: number): Observable<membermodel[]> {
    console.log('Au niveau du service', crisisId)
    const url = `${this.link}?filter[where][crisisId]=${crisisId}`;

    return this.http.get<any[]>(url).pipe( // Modifier le type de retour en any[]
      map((crisisUnits: any[]) => crisisUnits.map(crisisUnit => crisisUnit.membersId)),
      mergeMap((memberIds: number[]) => {
        const requests = memberIds.map(memberId => this.http.get<membermodel>(`${this.memberlink}/${memberId}`));
        console.log('forKJOIN ::', forkJoin(requests))
        return forkJoin(requests);

      })
    );
  }
  registerMemberToCrisis(memberId: number, crisisId: number) {

    const data = {
      isreferent: false,
      membersId: memberId,
      crisisId: crisisId
    };
    return this.http.post(this.link, data);
  }

  removeMemberFromCrisis(memberId: number, crisisId: number) {
    // 1. Faire une requête GET pour obtenir l'ID de l'entrée dans la table crisisunit
    // où memberId correspond à member_id et crisisId correspond à crisis_id
    console.log('DELETE : ', memberId, crisisId);
    const url = `${this.link}?filter={"where":{"membersId":${memberId},"crisisId":${crisisId}}}`;
    console.log('observble', this.http.get(url))
    // return this.http.get(url);


    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de l\'ID de la relation:', error);
        return throwError('Problème de récupération des données depuis l\'API');
      })
    ).pipe(
      // 2. Une fois l'ID obtenu, faire une requête DELETE pour supprimer la relation
      // en utilisant l'ID obtenu
      mergeMap(crisisUnits => {
        if (crisisUnits.length > 0) {
          const crisisUnitId = crisisUnits[0].crisisunit_id; // Supposons que l'ID est stocké dans une propriété 'id'
          const deleteUrl = `${this.link}/${crisisUnitId}`;
          return this.http.delete(deleteUrl);
        } else {
          return throwError('La relation n\'existe pas.');
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la suppression de la relation:', error);
        return throwError('Problème lors de la suppression de la relation.');
      })
    );
  }
}
