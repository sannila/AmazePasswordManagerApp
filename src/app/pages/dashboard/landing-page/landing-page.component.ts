import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpSerivceService } from '../../../services/http-serivce.service';
import { CredentialStoreComponent } from '../../credential-store/credential-store.component';
import { category, CredentialInterfaces } from '../../../interfaces/credential-interfaces';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, CredentialStoreComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  
  categoryList: category[];

  constructor(private httpService: HttpSerivceService, private router: Router) {
    if (!this.httpService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.httpService.get('category').subscribe({
      next: (res) => {
        if (res) {
          this.categoryList = res;
        }
      },
      error: (err) => console.log('categoryList', err),
    });
  }
}
