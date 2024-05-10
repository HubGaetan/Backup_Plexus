import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomecrisisComponent } from './crisis/homecrisis/homecrisis.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, HomecrisisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testangular';

  constructor(private router: Router) { }

  backHome() {
    this.router.navigate(['home']);
  }
}
