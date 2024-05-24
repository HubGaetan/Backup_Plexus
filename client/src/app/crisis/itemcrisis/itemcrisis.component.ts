import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { CommonModule } from '@angular/common';
import { CrisisunitService } from '../crisisunit.service';
import { MeetingsService } from '../meetings.service';

@Component({
  selector: 'app-itemcrisis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itemcrisis.component.html',
  styleUrl: './itemcrisis.component.scss'
})
export class ItemcrisisComponent implements OnInit {
  @Input() crisis: crisismodel;
  @Output() selectedCrisis = new EventEmitter();

  numberMember: number = 0;
  numberMeetings: number = 0;
  constructor(private crisisunitService: CrisisunitService, private meetingsService: MeetingsService) {
    this.crisis = new crisismodel(0, '', '', '', '', '', '', '', '', []);
  }


  selectCrisis() {
    // emission d'un evenement avec la crise consernée
    this.selectedCrisis.emit(
      this.crisis
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.crisisunitService.getMembersbyCrisisId(this.crisis.crisis_id).subscribe({
      next: (memberlist) => { // Utilisation de l'objet d'observateur
        this.numberMember = memberlist.length;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réunions :', error);
      }
    });

    this.meetingsService.getMeetingByCrisisId(this.crisis.crisis_id).subscribe({
      next: (meetingslist) => { // Utilisation de l'objet d'observateur
        this.numberMeetings = meetingslist.length;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réunions :', error);
      }
    });

  }






}
