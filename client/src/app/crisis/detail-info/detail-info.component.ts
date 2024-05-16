import { Component, Input, OnInit } from '@angular/core';
import { crisismodel } from '../../model/crisismodel';

@Component({
  selector: 'app-detail-info',
  standalone: true,
  imports: [],
  templateUrl: './detail-info.component.html',
  styleUrl: './detail-info.component.scss'
})
export class DetailInfoComponent implements OnInit {
  @Input() crisis_id: number;
  @Input() crisis: crisismodel;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    console.log('CRISISSS', this.crisis)
  }

}
