import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrisisService } from '../crisis.service';
import { crisismodel } from '../../model/crisismodel';
import { DetailtabsComponent } from '../detailtabs/detailtabs.component';
import { CommonModule, NgFor } from '@angular/common';
import { DescriptionComponent } from '../description/description.component';
import { MainCouranteComponent } from '../main-courante/main-courante.component';
import { BannerDetailcrisisComponent } from '../banner-detailcrisis/banner-detailcrisis.component';

@Component({
  selector: 'app-detailcrisis',
  standalone: true,
  imports: [DetailtabsComponent, NgFor, CommonModule, DescriptionComponent, MainCouranteComponent, BannerDetailcrisisComponent],
  templateUrl: './detailcrisis.component.html',
  styleUrl: './detailcrisis.component.scss'
})
export class DetailcrisisComponent {

  tabs: string[] = ['Description/Documents', 'Ressources/Cartographie', 'Main Courante'];
  activatedTabIndex: number = 0;

  totalMembers: number = 0;

  onTotalMembers(totalMembers: number) {
    this.totalMembers = totalMembers;
    console.log('DETAIL', this.totalMembers);
  }

  tabChange(tabIndex: number) {
    this.activatedTabIndex = tabIndex;
  }

  crisis: crisismodel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crisisService: CrisisService) {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log(params);
        this.crisisService.getCrisisById(params["id"]).subscribe({
          next: (crisis) => { // Utilisation de l'objet d'observateur
            this.crisis = crisis;
          },
          error: (error) => { alert('Problème de récupération de la crise'); }
        }

        )

      }
    );

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

  updateCrisis() {

    const link = ['updatecrisis', this.crisis.crisis_id];
    this.router.navigate(link);

  }

}
