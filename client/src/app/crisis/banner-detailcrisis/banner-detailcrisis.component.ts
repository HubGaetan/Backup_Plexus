import { Component, Input, OnInit } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { Router } from '@angular/router';
import { CrisisService } from '../crisis.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MeetingsService } from '../meetings.service';
import { IncidentbookService } from '../incidentbook.service';

@Component({
  selector: 'app-banner-detailcrisis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banner-detailcrisis.component.html',
  styleUrl: './banner-detailcrisis.component.scss'
})
export class BannerDetailcrisisComponent implements OnInit {

  @Input() crisis: crisismodel;
  @Input() totalMembers: number;


  modalOpen: boolean = false;
  modalUpdate: boolean = false;
  numberMeetings: number = 0;

  member_id: number = 0;


  constructor(private router: Router,
    private crisisService: CrisisService,
    private meetingsService: MeetingsService,
    private incidentbookService: IncidentbookService) { }



  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.meetingsService.getMeetingByCrisisId(this.crisis.crisis_id).subscribe({
      next: (meetingslist) => { // Utilisation de l'objet d'observateur
        this.numberMeetings = meetingslist.length;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réunions :', error);
      }
    });

  }

  updateModal(): void {
    this.modalUpdate = true;
    console.log('initial strtdate', this.crisis.startdate);
  }

  closeupdateModal(): void {
    this.modalUpdate = false;
  }

  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }


  deleteCrisis(): void {
    this.crisisService.deleteCrisis(this.crisis.crisis_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
        this.router.navigate(['home']);
      },
      error: (error) => { alert('Problème de la suppression'); }
    }

    );
  }
  convertDate(date: string): string {
    // Extraction de la partie de la date sans l'heure ni le fuseau horaire
    return date.split('T')[0];
  }

  updateCrisis(form: NgForm) {
    this.crisisService.updateCrisis(form.value, this.crisis.crisis_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
        // this.router.navigate(['home']);
        this.closeupdateModal();
      },
      error: (error) => { alert('Problème de modifications des données depuis l\'API'); }
    });
  }

  launchCrisis() {
    const updatedCrisis = { ...this.crisis, status: 'en cours' };
    console.log('UPDATED CRISSIS : ', updatedCrisis)
    this.crisisService.updateCrisis(updatedCrisis, updatedCrisis.crisis_id).subscribe({
      next: (response) => {
        this.crisis.status = 'en cours';
      },
      error: (error) => {
        alert('Problème lors du déclenchement de la crise');
      }
    });


    this.member_id = Math.floor(Math.random() * 5) + 1;
    const message = "la crise " + this.crisis.title + " a été déclenchée";
    const title = "Déclenchement de la crise";

    this.incidentbookService.addIncident(message, title, true, this.crisis.crisis_id, this.member_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
      },
      error: (error) => { alert('Problème lors de l\'ajout du message!'); }
    });

  }

  stopCrisis() {
    const updatedCrisis = { ...this.crisis, status: 'terminée' };
    this.crisisService.updateCrisis(updatedCrisis, this.crisis.crisis_id).subscribe({
      next: (response) => {
        this.crisis.status = 'terminée';
      },
      error: (error) => {
        alert('Problème lors du déclenchement de la crise');
      }
    });


    this.member_id = Math.floor(Math.random() * 5) + 1;
    const message = "la crise " + this.crisis.title + " est terminée";
    const title = "Fin de crise";

    this.incidentbookService.addIncident(message, title, true, this.crisis.crisis_id, this.member_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
      },
      error: (error) => { alert('Problème lors de l\'ajout du message!'); }
    });
  }

}
