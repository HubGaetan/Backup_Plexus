import { Injectable } from '@angular/core';
import { crisismodel } from '../model/crisismodel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  private crisislist: crisismodel[];
  private crisis: crisismodel;
  private link = 'http://localhost:3000/crises';


  constructor(private http: HttpClient) {

    this.crisis = new crisismodel(0, '', '', '', '', '', '', '', '', []);
  }

  getCrisislist(): Observable<crisismodel[]> {
    // return this.crisislist;
    return this.http.get<crisismodel[]>(this.link);
  }

  getCrisisById(id: number): Observable<crisismodel> {
    return this.http.get<crisismodel>(this.link + `/${id}`);
  }

  // ajouter une crise
  addCrisis(crisis: crisismodel): Observable<any> {
    return this.http.post(this.link, crisis)
  }
  deleteCrisis(id: number): Observable<any> {
    return this.http.delete<crisismodel>(this.link + `/${id}`);
  }

  updateCrisis(crisis: crisismodel, id: number): Observable<any> {
    return this.http.patch(this.link + `/${id}`, crisis)
  }


  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.link}/upload`, formData);
  }

}
