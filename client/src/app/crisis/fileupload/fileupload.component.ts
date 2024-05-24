import { Component, Input, OnInit } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { CrisisService } from '../crisis.service';
import { CommonModule } from '@angular/common';
import { IncidentbookService } from '../incidentbook.service';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.scss'
})
export class FileuploadComponent implements OnInit {
  selectedFileName: string | null = null;

  member_id: number =1;
  @Input() crisis_id: number;
  @Input() crisis: crisismodel;

  itemsPerPage = 5;
  itemsPerPageOptions = [5, 10, 15, 20];
  currentPage = 1;
  paginatedFiles: string[] = [];

  constructor(private crisisService: CrisisService, private incidentbookService: IncidentbookService) { }

  ngOnInit(): void {
    this.initializePathToFiles();
    this.updatePaginatedFiles();
  }

  initializePathToFiles() {
    if (!this.crisis.pathToFiles) {
      this.crisis.pathToFiles = [];
    }
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files);
      for (const file of files) {
        this.uploadFile(file);
      }
    }
  }

  uploadFile(file: File) {
    const fileName = file.name;
    this.initializePathToFiles();
    this.crisis.pathToFiles.push(fileName);

    // Mettre à jour la crise dans la base de données
    this.crisisService.updateCrisis(this.crisis, this.crisis.crisis_id).subscribe(() => {
      console.log('Nom du fichier enregistré avec succès dans la variable pathToFile de la crise.');
      this.updatePaginatedFiles();
    }, error => {
      console.error('Erreur lors de la mise à jour de la crise :', error);
    });

    this.member_id = Math.floor(Math.random() * 5) + 1;
    const message = "le fichier " + fileName + " a été ajouté aux documents ressources";
    const title = "Import d'un nouveau fichier";

    this.incidentbookService.addIncident(message, title, true , this.crisis.crisis_id, this.member_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur
        console.log(message,title,this.member_id,this.crisis_id);
      },
      error: (error) => { alert('Problème lors de l\'ajout du message!'); }
    });
  }

  getFileTypeImage(file: string): string {
    const extension = file.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'assets/images/pdf-icon.svg';
      case 'xls':
      case 'xlsx':
        return 'assets/images/excel-icon.svg';
      case 'doc':
      case 'docx':
      case 'txt':
        return 'assets/images/word-icon.svg';      
      default:
        return 'assets/images/default-icon.png'; // Image par défaut pour les autres types de fichiers
    }
  }

  getFileNameWithoutExtension(file: string): string {
    return file.split('.').slice(0, -1).join('.');
  }

  removeFile(index: number) {
    this.initializePathToFiles();
    if (this.crisis.pathToFiles) {
      this.crisis.pathToFiles.splice(index, 1);

      // Mettre à jour la crise dans la base de données
      this.crisisService.updateCrisis(this.crisis, this.crisis.crisis_id).subscribe(() => {
        console.log('Fichier supprimé avec succès de la variable pathToFile de la crise.');
        this.updatePaginatedFiles();
      }, error => {
        console.error('Erreur lors de la mise à jour de la crise :', error);
      });
    }
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = +selectElement.value;
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedFiles();
  }

  updatePaginatedFiles() {
    this.initializePathToFiles();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFiles = this.crisis.pathToFiles.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedFiles();
    }
  }

  get totalPages(): number {
    this.initializePathToFiles();
    return Math.ceil(this.crisis.pathToFiles.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}

// import { Component, Input, OnInit } from '@angular/core';
// import { crisismodel } from '../../model/crisismodel';
// import { CrisisService } from '../crisis.service';
// import { CommonModule } from '@angular/common';
// import { IncidentbookService } from '../incidentbook.service';
// import { MembersService } from '../members.service';
// import { incidentbookmodel } from '../../model/incidentbookmodel';

// @Component({
//   selector: 'app-fileupload',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './fileupload.component.html',
//   styleUrl: './fileupload.component.scss'
// })
// export class FileuploadComponent implements OnInit {
//   selectedFileName: string | null = null;

//   member_id: number =1;
//   @Input() crisis_id: number;
//   @Input() crisis: crisismodel;

//   constructor(private crisisService: CrisisService,private incidentbookService: IncidentbookService) { }

//   ngOnInit(): void {
//   }

//   handleFileInput(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files) {
//       const files = Array.from(inputElement.files);
//       for (const file of files) {
//         this.uploadFile(file);
//       }
//     }
//   }

//   uploadFile(file: File) {
//     const fileName = file.name;
//     if (!this.crisis.pathToFiles) {
//       this.crisis.pathToFiles = [];
//     }
//     this.crisis.pathToFiles.push(fileName);

//     // Mettre à jour la crise dans la base de données
//     this.crisisService.updateCrisis(this.crisis, this.crisis.crisis_id).subscribe(() => {
//       console.log('Nom du fichier enregistré avec succès dans la variable pathToFile de la crise.');
//     }, error => {
//       console.error('Erreur lors de la mise à jour de la crise :', error);
//     });

//     this.member_id = Math.floor(Math.random() * 5) + 1;
//     const message = "le fichier " + fileName + " a été ajouté aux documents ressources";
//     const title = "Import d'un nouveau fichier";

//     this.incidentbookService.addIncident(message, title, true , this.crisis.crisis_id, this.member_id).subscribe({
//       next: (response) => { // Utilisation de l'objet d'observateur
//         console.log(message,title,this.member_id,this.crisis_id);
//       },
//       error: (error) => { alert('Problème lors de l\'ajout du message!'); }
//     });



//   }

//   getFileTypeImage(file: string): string {
//     const extension = file.split('.').pop()?.toLowerCase();
//     switch (extension) {
//       case 'pdf':
//         return 'assets/images/pdf-icon.svg';
//       case 'xls':
//       case 'xlsx':
//         return 'assets/images/excel-icon.svg';
//       case 'doc':
//       case 'docx':
//       case 'txt':
//         return 'assets/images/word-icon.svg';      
        
//       default:
//         return 'assets/images/default-icon.png'; // Image par défaut pour les autres types de fichiers
//     }
//   }

//   getFileNameWithoutExtension(file: string): string {
//     return file.split('.').slice(0, -1).join('.');
//   }

//   removeFile(index: number) {
//     if (this.crisis.pathToFiles) {
//       this.crisis.pathToFiles.splice(index, 1);

//       // Mettre à jour la crise dans la base de données
//       this.crisisService.updateCrisis(this.crisis, this.crisis.crisis_id).subscribe(() => {
//         console.log('Fichier supprimé avec succès de la variable pathToFile de la crise.');
//       }, error => {
//         console.error('Erreur lors de la mise à jour de la crise :', error);
//       });
//     }
//   }
// }


