import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { meetingsmodel } from '../model/meetingsmodel';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private link = 'http://localhost:3000/meetings';


  constructor(private http: HttpClient) { }


  getMeetingslist(): Observable<meetingsmodel[]> {
    // return this.crisislist;
    return this.http.get<meetingsmodel[]>(this.link);
  }
}
