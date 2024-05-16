import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CrisisService } from '../crisis.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcrisis',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addcrisis.component.html',
  styleUrl: './addcrisis.component.scss'
})
export class AddcrisisComponent {
  constructor(private crisisService: CrisisService, private router: Router) { }

  addCrisis(form: NgForm) {
    form.value.localisation = [form.value.localisation];
    form.value.pathToFiles = [form.value.pathToFiles];
    console.log(form);
    this.crisisService.addCrisis(form.value).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
        this.router.navigate(['home']);
      },
      error: (error) => { alert('Problème de récupération des données depuis l\'API'); }
    });
  }
}
