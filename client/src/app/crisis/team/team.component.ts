import { Component, Input, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { membermodel } from '../../model/membermodel';
import { MembersService } from '../members.service';
import { CommonModule } from '@angular/common';
import { crisisunitmodel } from '../../model/crisisunitmodel';
import { CrisisunitService } from '../crisisunit.service';
import { InitialsCircleService } from '../initials-circle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {

  @Input() crisis_id: number;
  @Output() totalMembersEvent = new EventEmitter<number>();

  memberlist: membermodel[] = [];
  crisisunitlist: crisisunitmodel[] = [];
  teammembers: membermodel[] = [];
  remainingMembers: membermodel[] = [];
  filteredMembers: membermodel[] = [];

  modalOpen: boolean = false;
  searchTerm: string = '';

  constructor(
    private memberService: MembersService,
    private crisisunitService: CrisisunitService,
    private cdr: ChangeDetectorRef,
    public initialsCircleService: InitialsCircleService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }

  loadData(): void {
    this.memberService.getMemberslist().subscribe({
      next: (memberlist) => {
        this.memberlist = memberlist;
        this.filterMembers(); // Filtrer les membres ici
      },
      error: (error) => {
        alert('Problème de récupération des données depuis l\'API');
      }
    });

    if (this.crisis_id > 0) {
      this.crisisunitService.getMembersbyCrisisId(this.crisis_id).subscribe({
        next: (teammember) => {
          this.teammembers = teammember;
          this.totalMembersEvent.emit(this.teammembers.length);
          this.filterMembers(); // Filtrer les membres ici
        },
        error: (error) => {
          alert('Problème de récupération des données depuis l\'API');
        }
      });
    }
  }

  filterMembers(): void {
    this.remainingMembers = this.memberlist.filter(member =>
      !this.teammembers.some(teammember => teammember.member_id === member.member_id)
    );
    if (this.searchTerm) {
      this.filteredMembers = this.remainingMembers.filter(member =>
        member.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredMembers = this.remainingMembers;
    }
  }

  addMember(member: membermodel): void {
    this.crisisunitService.registerMemberToCrisis(member.member_id, this.crisis_id).subscribe({
      next: (response) => {
        console.log('La donnée a bien été enregistrée');
        this.loadData();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement de la donnée:', error);
        alert('Problème de récupération des données depuis l\'API');
      }
    });
  }

  removeRelation(teammember: membermodel): void {
    this.crisisunitService.removeMemberFromCrisis(teammember.member_id, this.crisis_id).subscribe({
      next: (response) => {
        console.log('REPONSE DU SERVEUR : ', response);
        console.log('La relation a bien été supprimée');
        this.loadData();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la relation:', error);
        alert('Problème de récupération des données depuis l\'API');
      }
    });
  }

  generateInitials(firstname: string, name: string): string {
    return (firstname.charAt(0) + name.charAt(0)).toUpperCase();
  }
}



// import { Component, Input, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
// import { membermodel } from '../../model/membermodel';
// import { MembersService } from '../members.service';
// import { CommonModule } from '@angular/common';
// import { crisisunitmodel } from '../../model/crisisunitmodel';
// import { CrisisunitService } from '../crisisunit.service';
// import { InitialsCircleService } from '../initials-circle.service';

// @Component({
//   selector: 'app-team',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './team.component.html',
//   styleUrl: './team.component.scss'
// })
// export class TeamComponent implements OnInit {

//   @Input() crisis_id: number;
//   @Output() totalMembersEvent = new EventEmitter<number>();

//   memberlist: membermodel[] = [];
//   crisisunitlist: crisisunitmodel[] = [];
//   teammembers: membermodel[] = [];
//   remainingMembers: membermodel[] = []; // Nouvelle liste de membres restants

//   modalOpen: boolean = false;

//   constructor(
//     private memberService: MembersService,
//     private crisisunitService: CrisisunitService,
//     private cdr: ChangeDetectorRef,
//     public initialsCircleService: InitialsCircleService // Inject ChangeDetectorRef
//   ) { }

//   ngOnInit(): void {
//     this.loadData();
//   }

//   openModal(): void {
//     this.modalOpen = true;
//   }
//   closeModal(): void {
//     this.modalOpen = false;
//   }

//   loadData(): void {

//     this.memberService.getMemberslist().subscribe({
//       next: (memberlist) => {
//         this.memberlist = memberlist;
//         this.remainingMembers = this.memberlist.filter(member =>
//           !this.teammembers.some(teammember => teammember.member_id === member.member_id)
//         );

//       },
//       error: (error) => {
//         alert('Problème de récupération des données depuis l\'API');
//       }
//     });

//     if (this.crisis_id > 0) {
//       this.crisisunitService.getMembersbyCrisisId(this.crisis_id).subscribe({
//         next: (teammember) => {
//           this.teammembers = teammember;
//           this.totalMembersEvent.emit(this.teammembers.length);

//           this.remainingMembers = this.memberlist.filter(member =>
//             !this.teammembers.some(teammember => teammember.member_id === member.member_id)
//           );

//         },
//         error: (error) => {
//           alert('Problème de récupération des données depuis l\'API');
//         }
//       });
//     }
//   }

//   addMember(member: membermodel): void {
//     this.crisisunitService.registerMemberToCrisis(member.member_id, this.crisis_id).subscribe({
//       next: (response) => {
//         console.log('La donnée a bien été enregistrée');
//         // Mettre à jour la liste des membres après l'ajout
//         this.loadData();
//         // Forcer le rafraîchissement de la vue
//         this.cdr.detectChanges();
//       },
//       error: (error) => {
//         console.error('Erreur lors de l\'enregistrement de la donnée:', error);
//         alert('Problème de récupération des données depuis l\'API');
//       }
//     });
//   }

//   removeRelation(member: membermodel): void {
//     this.crisisunitService.removeMemberFromCrisis(member.member_id, this.crisis_id).subscribe({
//       next: (response) => {
//         console.log('REPONSE DU SERVEUR : ', response)
//         console.log('La relation a bien été supprimée');
//         // Mettre à jour la liste des membres après l'ajout
//         this.loadData();
//         // Forcer le rafraîchissement de la vue
//         this.cdr.detectChanges();
//       },
//       error: (error) => {
//         console.error('Erreur lors de l\'enregistrement de la donnée:', error);
//         alert('Problème de récupération des données depuis l\'API');
//       }
//     });
//   }

//   generateInitials(firstname: string, name: string): string {
//     return (firstname.charAt(0) + name.charAt(0)).toUpperCase();
//   }
// }
