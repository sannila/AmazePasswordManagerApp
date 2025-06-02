import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [TableModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {

  userList: UserModel[];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.userService
      .getUserList()
      .then((res) => {
        if (res) {
          this.userList = res;
        }
      })
      .catch((err) => console.log('User List error:', err));
  }

  

  getUserName(firstName: string, lastName: string) {
    const _lastName = lastName ? lastName : '';
    return firstName + ' ' + _lastName;
  }

  

  update(userId: number) {
    console.log('Update for: ', userId);
    this.router.navigate([`/user/edit/${userId}`]);
  }

  delete(userId: number) {
    console.log('delete for: ', userId);
  }
}
