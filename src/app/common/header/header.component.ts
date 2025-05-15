import { Component, Input, OnInit } from '@angular/core';
import { HttpSerivceService } from '../../services/http-serivce.service';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatMenuModule, MatButtonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn: boolean = false;

  constructor(private httpService: HttpSerivceService, private router: Router) {
    if (!this.httpService.userValue) {
      // this.httpService.logout();
      this.router.navigate(['/home']);
      return;
    }

    
  }

  ngOnInit(): void {

  }

  signOut() {
    this.httpService.logout();
  }
}
