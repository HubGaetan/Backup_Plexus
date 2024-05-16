import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { DetailInfoComponent } from '../detail-info/detail-info.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { crisismodel } from '../../model/crisismodel';
import { MeetingsComponent } from '../meetings/meetings.component';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [TeamComponent, DetailInfoComponent, FileuploadComponent, MeetingsComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent implements OnInit {

  @Input() crisis_id: number
  @Input() crisis: crisismodel;

  totalMembers: number = 0;
  @Output() totalMembersEvent = new EventEmitter<number>();
  constructor() {
    // console.log('CRISIS ID DESCRIPTION : ', this.crisis_id);
  }
  ngOnInit(): void {
    console.log('CRISIS ID DESCRIPTION : ', this.crisis_id, this.crisis);
  }
  onTotalMembers(totalMembers: number) {
    this.totalMembers = totalMembers;
    this.totalMembersEvent.emit(this.totalMembers);
  }


}
