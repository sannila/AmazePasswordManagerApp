import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpSerivceService } from '../../services/http-serivce.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private httpSerive: HttpSerivceService,
    private router: Router
  ) {    
    if(this.httpSerive.userValue){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {
    this.formInitializer();
    
  }

  formInitializer() {
    this.signInForm = this.formBuilder.group({
      email: ['test4@test.com', [Validators.required, Validators.email]],
      password: ['Password@123', Validators.required],
    });
  }

  onSubmit() {
    console.log('Sign in form: ', this.signInForm.value);
    this.httpSerive.login('auth/login', this.signInForm.value).subscribe({
      next: (res: any) => {
        if (res && res.statusCode === 200) {
          this.router.navigate(['/dashboard'])
        }
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
  }
}
