import { Component, Input, OnInit } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { MeetingsService } from '../meetings.service';
import { meetingsmodel } from '../../model/meetingsmodel';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss'
})
export class MeetingsComponent implements OnInit {
  @Input() crisis: crisismodel;

  meetingslist: meetingsmodel[] = [];
  paginatedMeetings: meetingsmodel[] = [];
  selectedMeeting: meetingsmodel = new meetingsmodel();

  modalOpen: boolean = false;
  deletemodalOpen: boolean = false;
  isEditMode: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  iddel: number;
  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.meetingsService.getMeetingByCrisisId(this.crisis.crisis_id).subscribe({
      next: (meetingslist) => { // Utilisation de l'objet d'observateur
        meetingslist.sort((a, b) => {
          return b.id - a.id;
        });
        this.meetingslist = meetingslist;
        this.updatePaginatedMeetings();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réunions :', error);
      }
    });
  }

  updatePaginatedMeetings(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMeetings = this.meetingslist.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedMeetings();
    }
  }

  convertDate(date: string): string[] {
    const parts = date.split('-');
    const year = parts[0];
    const monthNum = parseInt(parts[1]);
    const day = parts[2];

    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const month = months[monthNum - 1];

    return [day, month, year];
  }

  deleteModal(id: number): void {
    this.deletemodalOpen = true;
    this.iddel = id;
  }

  closedeleteModal(): void {
    this.deletemodalOpen = false;
  }

  openModal(isEditMode: boolean = false, meeting?: meetingsmodel): void {
    this.isEditMode = isEditMode;
    if (isEditMode && meeting) {
      this.selectedMeeting = { ...meeting };
    } else {
      this.selectedMeeting = new meetingsmodel();
    }
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  addMeeting(meetingform: NgForm): void {
    const newMeeting: any = {
      title: meetingform.value.title,
      meetingdate: meetingform.value.meetingdate,
      starttime: meetingform.value.starttime,
      endtime: meetingform.value.endtime,
      crisisId: this.crisis.crisis_id,
      localisation: meetingform.value.localisation,
      isvisio: meetingform.value.isvisio
    };

    this.meetingsService.addMeeting(newMeeting).subscribe({
      next: (meeting) => {
        console.log('Réunion ajoutée avec succès :', meeting);
        this.loadData();
        this.closeModal();
        meetingform.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la réunion :', error);
      }
    });
  }

  updateMeeting(meetingform: NgForm): void {
    const updatedMeeting: any = {
      id: this.selectedMeeting.id,
      title: meetingform.value.title,
      meetingdate: meetingform.value.meetingdate,
      starttime: meetingform.value.starttime,
      endtime: meetingform.value.endtime,
      localisation: meetingform.value.localisation,
      isvisio: meetingform.value.isvisio
    };

    this.meetingsService.updateMeeting(updatedMeeting).subscribe({
      next: (meeting) => {
        console.log('Réunion mise à jour avec succès :', meeting);
        this.loadData();
        this.closeModal();
        meetingform.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la réunion :', error);
      }
    });
  }

  deleteMeeting(id: number): void {
    this.meetingsService.deleteMeeting(id).subscribe({
      next: (response) => {
        this.loadData();
        this.closedeleteModal();
      },
      error: (error) => { alert('Problème de la suppression'); }
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedMeetings();
  }

  get totalPages(): number {
    return Math.ceil(this.meetingslist.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}



// import { Component, Input, OnInit } from '@angular/core';
// import { crisismodel } from '../../model/crisismodel';
// import { MeetingsService } from '../meetings.service';
// import { meetingsmodel } from '../../model/meetingsmodel';
// import { CommonModule } from '@angular/common';
// import { NgForm } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-meetings',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './meetings.component.html',
//   styleUrl: './meetings.component.scss'
// })
// export class MeetingsComponent implements OnInit {
//   @Input() crisis: crisismodel;

//   meetingslist: meetingsmodel[] = [];
//   paginatedMeetings: meetingsmodel[] = [];
//   selectedMeeting: meetingsmodel = new meetingsmodel();

//   modalOpen: boolean = false;
//   deletemodalOpen: boolean = false;
//   isEditMode: boolean = false;

//   currentPage: number = 1;
//   itemsPerPage: number = 5;

//   iddel: number;
//   constructor(private meetingsService: MeetingsService) { }

//   ngOnInit(): void {
//     this.loadData();
//   }

//   loadData(): void {
//     this.meetingsService.getMeetingByCrisisId(this.crisis.crisis_id).subscribe({
//       next: (meetingslist) => { // Utilisation de l'objet d'observateur
//         this.meetingslist = meetingslist;
//         this.updatePaginatedMeetings();
//       },
//       error: (error) => {
//         console.error('Erreur lors de la récupération des réunions :', error);
//       }
//     });
//   }

//   updatePaginatedMeetings(): void {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     this.paginatedMeetings = this.meetingslist.slice(startIndex, endIndex);
//   }

//   goToPage(page: number) {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.updatePaginatedMeetings();
//     }
//   }

//   convertDate(date: string): string[] {
//     const parts = date.split('-');
//     const year = parts[0];
//     const monthNum = parseInt(parts[1]);
//     const day = parts[2];

//     const months = [
//       "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
//     ];
//     const month = months[monthNum - 1];

//     return [day, month, year];
//   }

//   deleteModal(id: number): void {
//     this.deletemodalOpen = true;
//     this.iddel = id;
//   }

//   closedeleteModal(): void {
//     this.deletemodalOpen = false;
//   }

//   openModal(isEditMode: boolean = false, meeting?: meetingsmodel): void {
//     this.isEditMode = isEditMode;
//     if (isEditMode && meeting) {
//       this.selectedMeeting = { ...meeting };
//     } else {
//       this.selectedMeeting = new meetingsmodel();
//     }
//     this.modalOpen = true;
//   }

//   closeModal(): void {
//     this.modalOpen = false;
//   }

//   addMeeting(meetingform: NgForm): void {
//     const newMeeting: any = {
//       title: meetingform.value.title,
//       meetingdate: meetingform.value.meetingdate,
//       starttime: meetingform.value.starttime,
//       endtime: meetingform.value.endtime,
//       crisisId: this.crisis.crisis_id,
//       localisation: meetingform.value.localisation,
//       isvisio: meetingform.value.isvisio
//     };

//     this.meetingsService.addMeeting(newMeeting).subscribe({
//       next: (meeting) => {
//         console.log('Réunion ajoutée avec succès :', meeting);
//         this.loadData();
//         this.closeModal();
//         meetingform.resetForm();
//       },
//       error: (error) => {
//         console.error('Erreur lors de l\'ajout de la réunion :', error);
//       }
//     });
//   }

//   updateMeeting(meetingform: NgForm): void {
//     const updatedMeeting: any = {
//       id: this.selectedMeeting.id,
//       title: meetingform.value.title,
//       meetingdate: meetingform.value.meetingdate,
//       starttime: meetingform.value.starttime,
//       endtime: meetingform.value.endtime,
//       localisation: meetingform.value.localisation,
//       isvisio: meetingform.value.isvisio
//     };

//     this.meetingsService.updateMeeting(updatedMeeting).subscribe({
//       next: (meeting) => {
//         console.log('Réunion mise à jour avec succès :', meeting);
//         this.loadData();
//         this.closeModal();
//         meetingform.resetForm();
//       },
//       error: (error) => {
//         console.error('Erreur lors de la mise à jour de la réunion :', error);
//       }
//     });
//   }

//   deleteMeeting(id: number): void {
//     this.meetingsService.deleteMeeting(id).subscribe({
//       next: (response) => {
//         this.loadData();
//         this.closedeleteModal();
//       },
//       error: (error) => { alert('Problème de la suppression'); }
//     });
//   }

//   setPage(page: number): void {
//     this.currentPage = page;
//     this.updatePaginatedMeetings();
//   }

//   get totalPages(): number {
//     return Math.ceil(this.meetingslist.length / this.itemsPerPage);
//   }

//   get pages(): number[] {
//     return Array(this.totalPages).fill(0).map((x, i) => i + 1);
//   }
// }

