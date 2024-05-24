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

  getMeetingByCrisisId(crisisId: number): Observable<meetingsmodel[]> {
    const url = `${this.link}?filter[where][crisisId]=${crisisId}`;
    return this.http.get<meetingsmodel[]>(url);
  }

  addMeeting(meeting: meetingsmodel): Observable<meetingsmodel> {
    return this.http.post<meetingsmodel>(this.link, meeting);
  }

  deleteMeeting(id: number): Observable<any> {
    return this.http.delete<meetingsmodel>(this.link + `/${id}`);
  }

  updateMeeting(meeting: meetingsmodel): Observable<any> {
    console.log('MEEEEEEEEEEEEEEEETTTINNNNG:', meeting, 'IDDDDDDDDDDDDD', meeting.id)
    return this.http.patch(this.link + `/${meeting.id}`, meeting)
  }

}

