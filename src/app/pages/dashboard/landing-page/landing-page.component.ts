import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpSerivceService } from '../../../services/http-serivce.service';
import { AssignedCredential, category, CredentialInterfaces } from '../../../models/credential-interfaces';
import { environment } from '../../../../environments/environment';
import { MyCredentialsComponent } from '../../my-credentials/my-credentials.component';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, MyCredentialsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  
  // categoryList: category[];
  assignedCredentialsList: AssignedCredential[] = null;
  errorMessage: string = null
  user: UserModel = null;

  constructor(private httpService: HttpSerivceService, private router: Router, private userService: UserService) {
    if (!this.httpService.userValue) {
      this.router.navigate(['/home']);
    }
    this.user = userService.getUser();
  }

  ngOnInit(): void {
    // this.getCategoryList();
    this.getAssignedCredentials();
  }

  getAssignedCredentials(){
    this.httpService.getById('assignedCredentials/byUser', this.user.id).subscribe({
      next: (res) => {
        if(res){
          this.assignedCredentialsList = res;
        }
      },
      error: (err) => {
        if(err && err.error.statusCode == 404){
          this.errorMessage = "No credential/s assigned";
        } else {
          this.errorMessage = "Some thing went wrong."
        }
      },
    })
  }

  // getCategoryList() {
  //   this.httpService.get('category').subscribe({
  //     next: (res) => {
  //       if (res) {
  //         this.categoryList = res;
  //       }
  //     },
  //     error: (err) => console.log('categoryList', err),
  //   });
  // }
}
