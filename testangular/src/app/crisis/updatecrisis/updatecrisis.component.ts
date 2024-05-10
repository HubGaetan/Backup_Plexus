import { Component } from '@angular/core';
import { CrisisService } from '../crisis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { crisismodel } from '../../model/crisismodel';

@Component({
  selector: 'app-updatecrisis',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './updatecrisis.component.html',
  styleUrl: './updatecrisis.component.scss'
})
export class UpdatecrisisComponent {

  crisisold: crisismodel;
  constructor(private crisisService: CrisisService, private router: Router, private activatedRoute: ActivatedRoute
  ) {
    this.crisisold = new crisismodel(0, '', '', '', '', '', '', '', [], []);


    this.activatedRoute.params.subscribe(
      (params) => {
        console.log(params);
        this.crisisService.getCrisisById(params["id"]).subscribe({
          next: (crisis) => { // Utilisation de l'objet d'observateur
            this.crisisold = crisis;
          },
          error: (error) => { alert('Problème de récupération de la crise'); }
        }

        )

      }
    );
  }

  updateCrisis(form: NgForm) {
    console.log(form);
    this.crisisService.updateCrisis(form.value, this.crisisold.crisis_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
        this.router.navigate(['home']);
      },
      error: (error) => { alert('Problème de récupération des données depuis l\'API'); }
    });
  }
}

