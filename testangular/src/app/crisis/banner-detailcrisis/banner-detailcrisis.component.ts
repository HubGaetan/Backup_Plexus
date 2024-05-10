import { Component, Input } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { Router } from '@angular/router';
import { CrisisService } from '../crisis.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-banner-detailcrisis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banner-detailcrisis.component.html',
  styleUrl: './banner-detailcrisis.component.scss'
})
export class BannerDetailcrisisComponent {

  @Input() crisis: crisismodel;
  @Input() totalMembers: number;


  modalOpen: boolean = false;
  modalUpdate: boolean = false;

  updateModal(): void {
    this.modalUpdate = true;
    console.log('initial strtdate', this.crisis.startdate);
    this.crisis.startdate = this.convertDate(this.crisis.startdate);
    this.crisis.enddate = this.convertDate(this.crisis.enddate);


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


  constructor(private router: Router,
    private crisisService: CrisisService) { }

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
    form.value.localisation = [form.value.localisation];



    console.log('FORM RECU', form.value);
    this.crisisService.updateCrisis(form.value, this.crisis.crisis_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
        // this.router.navigate(['home']);
        this.closeupdateModal();
      },
      error: (error) => { alert('Problème de modifications des données depuis l\'API'); }
    });
  }
  // updateCrisis() {

  //   const link = ['updatecrisis', this.crisis.crisis_id];
  //   this.router.navigate(link);

  // }
}
