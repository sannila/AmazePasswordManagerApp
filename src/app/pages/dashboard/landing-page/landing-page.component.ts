import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpSerivceService } from '../../../services/http-serivce.service';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  constructor(private httpService: HttpSerivceService, private router: Router) {
    if (!this.httpService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.getActivityLog();
  }

  getActivityLog(){
    this.httpService.get('activityLog').subscribe({
      next: (res) => console.log('Activity log: ', res),
      error: (err) => console.log('Activity Log error: ', err),
    });
  }

  signOut(){
    this.httpService.logout();
  }
}
