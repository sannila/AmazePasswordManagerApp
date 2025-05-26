import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  category,
  CredentialInterfaces,
} from '../../models/credential-interfaces';
import { AccordionModule } from 'primeng/accordion';
import { HttpSerivceService } from '../../services/http-serivce.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-credential-store',
  standalone: true,
  imports: [
    AccordionModule,
    TableModule,
    ButtonModule,
    PopoverModule,
    PasswordModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './credential-store.component.html',
  styleUrl: './credential-store.component.css',
})
export class CredentialStoreComponent implements OnInit, OnChanges {
  @Input() categoryList: category[];
  @ViewChild('op') op!: Popover;

  credentialList: CredentialInterfaces[];
  activeIndex: number = 0;
  enteredPassword: string = null;

  constructor(
    private httpService: HttpSerivceService,
    private cdRef: ChangeDetectorRef
  ) {
    this.activeIndex = 0;
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges(); // Prevents ExpressionChanged error after initial load
  }

  ngOnInit(): void {
    console.log('categoryList: ', this.categoryList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryList'] && changes['categoryList'].currentValue) {
      this.categoryList = changes['categoryList'].currentValue;
    }
  }

  getCredentialByCategoryId(event) {
    this.httpService.getById('credentialStore/byCategory', event).subscribe({
      next: (res) => (this.credentialList = res),
      error: (err) => console.log('Error from Credential Store comp', err),
    });
  }

  onPanelOpen(event: any): void {
    this.activeIndex = event.index;
    const categoryId = event.index;
    if (categoryId) {
      this.getCredentialByCategoryId(categoryId);
    }
  }

  toggle(event) {
    console.log('onShowPopOver($event): ', event);
  }

  onPasswordValidation() {
    console.log('onPasswordValidation: ', this.enteredPassword);
    this.enteredPassword = null;
  }
}
