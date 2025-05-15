import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpSerivceService } from '../../services/http-serivce.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private httpService: HttpSerivceService, private router: Router)
  {    
    if(!this.httpService.userValue){
      this.router.navigate(['/home'])
    }
  }


  ngOnInit(): void {
  }
}
