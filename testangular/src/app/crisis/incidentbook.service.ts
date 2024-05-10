import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { incidentbookmodel } from '../model/incidentbookmodel';


@Injectable({
  providedIn: 'root'
})
export class IncidentbookService {

  private link = 'http://localhost:3000/incidentbooks';

  constructor(private http: HttpClient) { }


  getIncidentBooklist(): Observable<incidentbookmodel[]> {
    // return this.crisislist;
    return this.http.get<incidentbookmodel[]>(this.link);
  }


  getIncidentBookByCrisisId(crisis_id: number): Observable<incidentbookmodel[]> {
    const params = new HttpParams().set('filter', JSON.stringify({ where: { crisisId: crisis_id }, include: [{ relation: 'members' }] }));
    return this.http.get<incidentbookmodel[]>(this.link, { params: params });
  }

  addIncident(message: string, title: string, isevent: boolean, crisisId: number, memberId: number): Observable<incidentbookmodel> {
    const messagedate = new Date().toISOString();

    const incidentData: incidentbookmodel = {
      crisisId: crisisId,
      membersId: memberId,
      title: title,
      content: message,
      messagedate: messagedate,
      isevent: isevent
    };
    console.log('INCIDENT DATA', incidentData);

    return this.http.post<incidentbookmodel>(this.link, incidentData);
  }

  // addIncident(message: string, title: string, isevent: boolean, crisisId: number): Observable<incidentbookmodel> {
  //   const memberId = Math.floor(Math.random() * 5) + 1; // Génération d'un nombre aléatoire entre 1 et 5 pour memberId
  //   const messagedate = new Date().toUTCString();
  //   const year = currentDate.getFullYear();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  //   const day = currentDate.getDate().toString().padStart(2, '0');
  //   const hours = currentDate.getHours().toString().padStart(2, '0');
  //   const minutes = currentDate.getMinutes().toString().padStart(2, '0');

  //   Format de la date : YYYY-MM-DDTHH:MM:SS.mmmZ
  //   const messagedate = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;

  //   const incidentData: incidentbookmodel = {
  //     crisisId: crisisId,
  //     membersId: memberId,
  //     title: title,
  //     content: message,
  //     messagedate: messagedate,
  //     isevent: isevent
  //   };
  //   console.log('INCIDENT DATA', incidentData);

  //   return this.http.post<incidentbookmodel>(this.link, incidentData);
  // }

}
