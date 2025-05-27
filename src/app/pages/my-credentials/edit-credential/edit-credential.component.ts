import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MyCredentialService } from '../../../services/my-credential.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  category,
  CredentialInterfaces,
} from '../../../models/credential-interfaces';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-edit-credential',
  imports: [
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
  ],
  standalone: true,
  templateUrl: './edit-credential.component.html',
  styleUrl: './edit-credential.component.css',
  providers: [DialogService],
})
export class EditCredentialComponent implements OnInit {
  isLoading: boolean = false;
  credentialFormData: CredentialInterfaces;
  credentialForm: FormGroup;
  categoryList: {
    name: string;
    code: number;
  }[] = [];
  editCredentialId: number;
  currentUser: UserModel = null;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dyamicDialogRef: DynamicDialogRef,
    private httpService: MyCredentialService,
    private formBuilder: FormBuilder,
    private userservice: UserService
  ) {
    this.currentUser = this.userservice.getUser();
  }

  ngOnInit(): void {
    console.log('Dialog data: ', this.dialogConfig.data.credentialId);
    this.formInitiazer();
    this.editCredentialId = this.dialogConfig.data.credentialId;
    this.getCredentialById();
  }

  getCredentialById() {
    this.httpService
      .getCredentialById(this.editCredentialId)
      .then((res) => {
        this.credentialFormData = res;
        this.mapCategoryList();
        this.credentialForm.patchValue(res);

        console.log('credentialForm: ', this.credentialForm.value);
      })
      .catch((err) => console.log('Error: ', err));
  }

  formInitiazer() {
    this.credentialForm = this.formBuilder.group({
      categoryId: [null, [Validators.required]],
      credentialId: ['', [Validators.required]],
      websiteName: ['', [Validators.required]],
      websiteUrl: ['', [Validators.required]],
      notes: [''],
      updatedBy: [null],
    });
  }

  mapCategoryList() {
    this.httpService.getAll('category').then((res) => {
      if (res && res.length) {
        this.categoryList = res.map((c) => ({
          name: c.categoryName,
          code: c.categoryId,
        }));
      }
    });
  }

  onUpdateCredential() {
    this.credentialForm.get('updatedBy').setValue(this.currentUser.id);
    this.httpService
      .updateCredentialById(this.editCredentialId, this.credentialForm.value)
      .then((res) => {
        if (res) {
          this.dyamicDialogRef.close({ message: res });
        }
      })
      .catch((err) => console.log('Error on credential update:', err));
  }

  onCancel() {
    this.dyamicDialogRef.close();
  }
}
