import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemcrisisComponent } from '../itemcrisis/itemcrisis.component';
import { crisismodel } from '../../model/crisismodel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listcrisis',
  standalone: true,
  imports: [ItemcrisisComponent, CommonModule],
  templateUrl: './listcrisis.component.html',
  styleUrl: './listcrisis.component.scss'
})
export class ListcrisisComponent {
  @Input() crisislist: crisismodel[];
  @Output() selectedCrisis = new EventEmitter();

  constructor(private router: Router) {
    this.crisislist = [];
  }

  selectCrisis(selectedCrisis: crisismodel) {
    this.selectedCrisis.emit(selectedCrisis);
  }

  moreInfo(id: number) {
    const link = ['detail', id];
    this.router.navigate(link);
  }
}
