import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RoleModel, UserModel } from '../../../models/user.model';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-user',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    SelectModule,
    InputMaskModule,
    ButtonModule,
    ToastModule
  ],
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
  providers: [MessageService],
})
export class EditUserComponent implements OnInit {
  userId: number;
  userDetails: UserModel;
  userForm: FormGroup;
  roles: RoleModel[];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userServie: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userFormInitializer();
    this.roles = [
      { name: 'Admin', code: 'Admin' },
      { name: 'User', code: 'User' },
      { name: 'Guest', code: 'Guest' },
    ];
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Edit for userid: ', this.userId);
    this.getUserDetails(this.userId);
  }

  getUserDetails(userId: number) {
    this.userServie
      .getUserById(userId)
      .then((res) => {
        if (res) {
          this.userDetails = res;
          this.userForm.patchValue(res);
          console.log('User Form response: ', res);
          console.log('User Form value: ', this.userForm.value);
        }
      })
      .catch((err) => console.log('Error: ', err));
  }

  userFormInitializer() {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      dateOfBirth: [],
      role: [null, [Validators.required]],
      phoneNumber: [null],
      isLocked: [false],
    });
  }

  onUserUpdate() {
    console.log('User Form value: ', this.userForm.value);
    this.isLoading = true;
    this.userServie
      .updateUser(this.userId, this.userForm.value)
      .then((res) => {
        this.isLoading = false;
        if (res && res.statusCode == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'User Update',
            detail: "Updated successfully",
            life: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/user']);
          }, 1000);
        }
      })
      .catch((err) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
          life: 3000,
        })
      );
  }

  cancelUpdate() {
    this.router.navigate(['/user']);
  }
}
