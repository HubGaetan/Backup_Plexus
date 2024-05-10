import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detailtabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailtabs.component.html',
  styleUrl: './detailtabs.component.scss'
})
export class DetailtabsComponent {

  @Input() tabsArray: string[] = [];
  activatedTab: number = 0;

  @Output() onTabChange = new EventEmitter<number>();

  setTab(index: number) {
    this.activatedTab = index;
    this.onTabChange.emit(this.activatedTab);
  }

}
