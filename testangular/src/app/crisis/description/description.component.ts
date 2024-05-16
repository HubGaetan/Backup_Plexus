import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { DetailInfoComponent } from '../detail-info/detail-info.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { crisismodel } from '../../model/crisismodel';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [TeamComponent, DetailInfoComponent, FileuploadComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent implements OnInit {

  @Input() crisis_id: number
  totalMembers: number = 0;
  @Output() totalMembersEvent = new EventEmitter<number>();
  // @Input() crisis_id!: number;
  @Input() crisis: crisismodel;
  constructor() {
    // console.log('CRISIS ID DESCRIPTION : ', this.crisis_id);
  }
  ngOnInit(): void {
    console.log('CRISIS ID DESCRIPTION : ', this.crisis_id);
  }
  onTotalMembers(totalMembers: number) {
    this.totalMembers = totalMembers;
    this.totalMembersEvent.emit(this.totalMembers);
  }


}
