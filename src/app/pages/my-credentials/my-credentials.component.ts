import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  AssignedCredential,
  category,
  CredentialInterfaces,
} from '../../models/credential-interfaces';
import { TableModule } from 'primeng/table';
import { MyCredentialService } from '../../services/my-credential.service';
import { ButtonModule } from 'primeng/button';
import { CopyClipboardDirective } from '../../common/directives/copy-clip-board.directive';
import { TooltipModule } from 'primeng/tooltip';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { EditCredentialComponent } from './edit-credential/edit-credential.component';

@Component({
  selector: 'app-my-credentials',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    TooltipModule,
    CopyClipboardDirective,
    DynamicDialogModule,
  ],
  templateUrl: './my-credentials.component.html',
  styleUrl: './my-credentials.component.css',
  providers: [MyCredentialService, DialogService],
})
export class MyCredentialsComponent implements OnInit, OnChanges {
  @Input() assignedCredentialsList: AssignedCredential[] = [];
  @Output() onUpdateEmitter = new EventEmitter<boolean>();

  credentialList: CredentialInterfaces[] = [];
  categoryList: category[] = [];
  buttonList: any[];
  selectedCategory: number = null;
  displayCredentialList: CredentialInterfaces[] = null;
  tooltipForCopyClipBoard: string = 'Copy to clipboard';
  copyButtonIcon: string = 'pi pi-copy';

  dynamicDialogRef: DynamicDialogRef;

  constructor(
    private myCredentialService: MyCredentialService,
    private dialogService: DialogService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['assignedCredentialsList'] && changes['assignedCredentialsList'].currentValue){
      this.assignedCredentialsList = changes['assignedCredentialsList'].currentValue;
    }
  }

  ngOnInit(): void {
    console.log('assignedCredentialsList', this.assignedCredentialsList);
    this.fetchCredentialDetails();
  }

  fetchCredentialDetails() {
    const credentialIds = this.assignedCredentialsList.map(
      (c) => c.credentialId
    );
    this.myCredentialService.getCredentialList(credentialIds).then((res) => {
      if (res) {
        this.credentialList = res;
        console.log('credentialList:', this.credentialList);
        this.fetchCategoryList();
      }
    });
  }

  fetchCategoryList() {
    const categoryIds = this.credentialList.map((c) => c.categoryId);

    this.myCredentialService.getCategoryList(categoryIds).then((res) => {
      if (res) {
        this.categoryList = res;
        this.selectedCategory = res[0].categoryId;
        this.onCategorySelect(this.selectedCategory);
        console.log('categoryList:', this.categoryList);
        this.buildTreeNodes();
      }
    });
  }

  private buildTreeNodes(): void {
    this.buttonList = this.categoryList.map((category): any => ({
      key: category.categoryId,
      label: category.categoryName,
      icon: 'pi pi-folder',
    }));
  }

  onCategorySelect(event) {
    this.selectedCategory = event;
    this.displayCredentialList = this.credentialList.filter(
      (c) => c.categoryId == event
    );
  }

  copiedEvent(event: any) {
    this.copyButtonIcon = event.icon;
    this.tooltipForCopyClipBoard = event.pTooltip;
  }

  update(id: number) {
    this.dynamicDialogRef = this.dialogService.open(EditCredentialComponent, {
      header: 'Update',
      width: '50vw',
      height: '100%',
      modal: true,
      closable: true,
      data: {
        credentialId: id,
        categoryList: this.categoryList
      }
    });

    this.dynamicDialogRef.onClose.subscribe(result => {
      if(result){
        console.log('Dialog result:', result)
        // this.onCategorySelect(this.selectedCategory);
        this.fetchCredentialDetails()
      } else {
        console.log('Dialog was not closed', result)
      }
    })
  }

  delete(id: number) {}

  onCreateCategory() {}
}
