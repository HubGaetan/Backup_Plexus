import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itemcrisis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itemcrisis.component.html',
  styleUrl: './itemcrisis.component.scss'
})
export class ItemcrisisComponent {
  @Input() crisis: crisismodel;
  @Output() selectedCrisis = new EventEmitter();
  constructor() {
    this.crisis = new crisismodel(0, '', '', '', '', '', '', '', '', []);
  }


  selectCrisis() {
    // emission d'un evenement avec la crise consernée
    this.selectedCrisis.emit(
      this.crisis
    );
  }




}
