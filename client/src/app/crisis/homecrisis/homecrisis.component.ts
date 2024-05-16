import { Component, OnInit } from '@angular/core';
import { ListcrisisComponent } from '../listcrisis/listcrisis.component';
import { ItemcrisisComponent } from '../itemcrisis/itemcrisis.component';
import { crisismodel } from '../../model/crisismodel';
import { CrisisService } from '../crisis.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-homecrisis',
  standalone: true,
  imports: [ListcrisisComponent, ItemcrisisComponent, HttpClientModule, FormsModule],
  templateUrl: './homecrisis.component.html',
  styleUrl: './homecrisis.component.scss'
})
export class HomecrisisComponent implements OnInit {

  crisislist: crisismodel[] = [];
  selectedCrisis: crisismodel;
  newCrisis: crisismodel;

  modalOpen: boolean = false;

  constructor(private crisisService: CrisisService, private router: Router) {
    this.selectedCrisis = new crisismodel(0, '', '', '', '', '', '', '', '', []);



  }


  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    this.crisisService.getCrisislist().subscribe({
      next: (crisislist) => { // Utilisation de l'objet d'observateur
        this.crisislist = crisislist;
      },
      error: (error) => { alert('Problème de récupération des données depuis l\'API'); }
    });

  }


  selectCrisis(crisis: crisismodel) {
    this.selectedCrisis = crisis;
    console.log(crisis);

  }


  addCrisis(form: NgForm) {
    console.log('FORM NIA', form.value);
    if (form.value.startdate === '') {
      form.value.startdate = new Date().toISOString().split('T')[0];
    }
    if (form.value.enddate === '') {
      form.value.enddate = new Date().toISOString().split('T')[0];
    }
    console.log('FORM NIA', form.value);

    this.crisisService.addCrisis(form.value).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
        this.loadData();
        this.modalOpen = false;
      },
      error: (error) => { alert('Problème de récupération des données depuis l\'API'); }
    });
  }

  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }

}
