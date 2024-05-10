// import { Component, Input, OnInit } from '@angular/core';
// import { crisismodel } from '../../model/crisismodel';

// @Component({
//   selector: 'app-fileupload',
//   standalone: true,
//   imports: [],
//   templateUrl: './fileupload.component.html',
//   styleUrl: './fileupload.component.scss'
// })
// export class FileuploadComponent implements OnInit {
//   selectedFile: File | null = null;

//   @Input() crisis_id: number;

//   constructor() { }

//   ngOnInit() {
//     console.log("CRISIS NUMMMMMBER", this.crisis_id);
//   }

//   handleFileInput(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files) {
//       this.selectedFile = inputElement.files[0];
//     }
//   }

//   uploadFile() {
//     if (this.selectedFile) {
//       // Effectuez l'envoi du fichier ici
//       console.log('Fichier sélectionné : ', this.selectedFile);
//     } else {
//       console.log('Aucun fichier sélectionné.');
//     }
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.scss'
})
export class FileuploadComponent implements OnInit {
  selectedFileName: string | null = null;

  @Input() crisis_id: number;

  constructor(private crisisService: CrisisService) { }



  ngOnInit(): void {
    this.crisisService.getCrisisById(this.crisis_id).subscribe(crisis => {
      console.log('CRISIS BEFORE1', crisis);
      //   this.crisisService.updateCrisis(crisis, this.crisis_id).subscribe(() => {
      //     console.log('CRISIS UPSTAS', crisis)
      //     console.log('Nom du fichier enregistré avec succès dans la variable pathToFile de la crise.');
      //   }, error => {
      //     console.error('Erreur lors de la mise à jour de la crise :', error);
      //   });
    })
  }


  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFileName = inputElement.files[0].name;
    }
  }

  uploadFile() {
    if (this.selectedFileName) {
      // Mettre à jour la variable pathToFile de la crise
      console.log("SELECTED FILE", this.selectedFileName);
      this.crisisService.getCrisisById(this.crisis_id).subscribe(crisis => {
        console.log('CRISIS BEFORE', crisis);
        if (this.selectedFileName) {
          console.log('PATHHHHH', crisis.pathToFiles);
          crisis.pathToFiles.push(this.selectedFileName);
          console.log('PATHHHHH2', crisis);

        }
        // Mettre à jour la crise dans la base de données
        this.crisisService.updateCrisis(crisis, this.crisis_id).subscribe(() => {
          console.log('Nom du fichier enregistré avec succès dans la variable pathToFile de la crise.');
        }, error => {
          console.error('Erreur lors de la mise à jour de la crise :', error);
        });
      }, error => {
        console.error('Erreur lors de la récupération de la crise :', error);
      });
    } else {
      console.log('Aucun fichier sélectionné.');
    }
  }
}

