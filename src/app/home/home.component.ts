import { Component } from '@angular/core';
import { SignInComponent } from '../pages/sign-in/sign-in.component';

@Component({
  selector: 'app-home',
  imports: [SignInComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
