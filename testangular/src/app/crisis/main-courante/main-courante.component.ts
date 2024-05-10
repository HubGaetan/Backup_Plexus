import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { IncidentbookService } from '../incidentbook.service';
import { MembersService } from '../members.service';
import { incidentbookmodel } from '../../model/incidentbookmodel';


@Component({
  selector: 'app-main-courante',
  standalone: true,
  imports: [HttpClientModule, AngularEditorModule, FormsModule, CommonModule, TimelineModule, CardModule],
  templateUrl: './main-courante.component.html',
  styleUrl: './main-courante.component.scss'
})
export class MainCouranteComponent implements OnInit {

  @Input() crisis_id: number;

  htmlContent: string;
  messagetitle: string;

  eventFormVisible: boolean = false;
  messageFormVisible: boolean = false;

  messages: incidentbookmodel[];
  messagesCrisis: any[];

  public member_id: number; // Génération d'un nombre aléatoire entre 1 et 5 pour memberId

  messagesCrisisWithMemberName: { crisisId: number, membersId: number, title: string, content: string, messagedate: string, isevent: boolean, memberName: string, initials: string }[] = [];


  constructor(private incidentbookService: IncidentbookService, private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadData();
  }


  toggleEventForm(): void {
    this.eventFormVisible = !this.eventFormVisible;
    this.messageFormVisible = false; // Assure que seul un formulaire est visible à la fois
  }

  toggleMessageForm(): void {
    this.messageFormVisible = !this.messageFormVisible;
    this.eventFormVisible = false; // Assure que seul un formulaire est visible à la fois
  }

  messageAdd(message: string, title: string, isevent: boolean): void {
    console.log('TITRE :', title, 'MESSAGE :', message);
    this.member_id = Math.floor(Math.random() * 5) + 1;

    this.incidentbookService.addIncident(message, title, isevent, this.crisis_id, this.member_id).subscribe({
      next: (response) => { // Utilisation de l'objet d'observateur

        this.loadData();
        this.htmlContent = '';
        this.messagetitle = '';
        this.messageFormVisible = false;
        this.eventFormVisible = false;
      },
      error: (error) => { alert('Problème lors de l\'ajout du message!'); }
    });
  }

  loadData(): void {

    this.incidentbookService.getIncidentBooklist().subscribe({
      next: (messages) => { // Utilisation de l'objet d'observateur
        this.messages = messages;
        console.log(this.messages);
      },
      error: (error) => { alert('Problème de récupération des messages'); }
    }
    )

    this.incidentbookService.getIncidentBookByCrisisId(this.crisis_id).subscribe({
      next: (messages) => { // Utilisation de l'objet d'observateur
        console.log(messages);
        this.messagesCrisis = messages.reverse();
        console.log('NOUVEAU :', this.messages);

      },
      error: (error) => { alert('Problème de récupération des messages'); }
    });



  }

  generateInitials(firstname: string, name: string): string {
    return (firstname.charAt(0) + name.charAt(0)).toUpperCase();
  }


}
