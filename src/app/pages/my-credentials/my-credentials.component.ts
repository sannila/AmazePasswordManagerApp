import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-my-credentials',
  standalone: true,
  imports: [ButtonModule, TableModule, TooltipModule, CopyClipboardDirective],
  templateUrl: './my-credentials.component.html',
  styleUrl: './my-credentials.component.css',
  providers: [MyCredentialService],
})
export class MyCredentialsComponent implements OnInit {
  @Input() assignedCredentialsList: AssignedCredential[] = [];
  credentialList: CredentialInterfaces[] = [];
  categoryList: category[] = [];
  buttonList: any[];
  isDataLoaded: boolean = false;
  selectedCategory: number = null;
  displayCredentialList: CredentialInterfaces[] = null;
  tooltipForCopyClipBoard: string = 'Copy to clipboard';
  copyButtonIcon: string = 'pi pi-copy';

  constructor(private myCredentialService: MyCredentialService) {}

  ngOnInit(): void {
    console.log('assignedCredentialsList', this.assignedCredentialsList);
    this.isDataLoaded = true;
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
    console.log('onNodeSelect: ', event);
    this.selectedCategory = event;
    this.displayCredentialList = this.credentialList.filter(
      (c) => c.categoryId == event
    );
  }

  copiedEvent(event: any) {
      this.copyButtonIcon = event.icon;
      this.tooltipForCopyClipBoard = event.pTooltip
    }

  update(id: number) {}

  delete(id: number) {}

  onCreateCategory() {}
}
