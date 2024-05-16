import { Injectable } from '@angular/core';
import { membermodel } from '../model/membermodel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private memberslist: membermodel[] = [];
  private member: membermodel = new membermodel(0, '', '', '', '');
  private link = 'http://localhost:3000/members';

  constructor(private http: HttpClient) { }



  getMemberslist(): Observable<membermodel[]> {
    // return this.crisislist;
    return this.http.get<membermodel[]>(this.link);
  }

  getMemberById(id: number): Observable<membermodel> {

    return this.http.get<membermodel>(this.link + `/${id}`);
  }

}
