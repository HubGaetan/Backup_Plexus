import { Component, Input, OnInit } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { MeetingsService } from '../meetings.service';
import { meetingsmodel } from '../../model/meetingsmodel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss'
})
export class MeetingsComponent implements OnInit {

  @Input() crisis: crisismodel;

  meetingslist: meetingsmodel[];

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    this.meetingsService.getMeetingslist().subscribe({
      next: (meetingslist) => { // Utilisation de l'objet d'observateur
        this.meetingslist = meetingslist;
      },
      error: (error) => { alert('Problème de récupération des données depuis l\'API'); }
    });

  }
}
