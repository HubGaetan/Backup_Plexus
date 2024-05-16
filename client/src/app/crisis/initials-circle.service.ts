import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitialsCircleService {

  constructor() { }

  generateCircle(firstName: string, lastName: string): string {
    const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    const colors = ['#FF5733', '#33FF8D', '#338AFF', '#FF33FF']; // Couleurs aléatoires
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `<div class="circle" style="background-color: ${randomColor}">${initials}</div>`;
  }
}
