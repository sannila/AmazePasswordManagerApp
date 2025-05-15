import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpSerivceService } from '../../../services/http-serivce.service';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, UsersComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {

  userList: any;

  constructor(private httpService: HttpSerivceService, private router: Router) {
    if (!this.httpService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.getActivityLog();
  }

  getActivityLog(){
    this.httpService.get('user').subscribe({
      next: (res) => this.userList = res,
      error: (err) => console.log('user Log error: ', err),
    });
  }
}
