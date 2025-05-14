import { Component } from '@angular/core';
import { HeaderComponent } from './common/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './common/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Amaze Password Manager';
}
