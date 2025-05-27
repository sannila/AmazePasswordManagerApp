import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { HttpSerivceService } from '../../services/http-serivce.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, ToastModule],
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [MessageService],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup | undefined;
  forgotPasswordForm: FormGroup;
  isForgotPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpSerive: HttpSerivceService,
    private router: Router,
    private messageService: MessageService
  ) {    
    if(this.httpSerive.userValue){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {
    this.signInFormInitializer();
  }

  signInFormInitializer() {
    this.signInForm = this.formBuilder.group({
      email: ['test1@test.com', [Validators.required, Validators.email]],
      password: ['Password@123', Validators.required],
    });
  }

  forgotFormInitializer(){
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
          life: 3000
        })
      },
    });
  }

  onForgotPassword(){
    this.isForgotPassword = true;
    this.forgotFormInitializer();
  }

  onUpdatePassword(){
    console.log('this.forgotPasswordForm.value', this.forgotPasswordForm.value);
  }
}
