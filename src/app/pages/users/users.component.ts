import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, TableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UserService],
})
export class UsersComponent implements OnInit, OnChanges {
  userList: UserModel[];

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userList'] && changes['userList']) {
      this.userList = changes['userList'].currentValue;
    }
  }

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
    const _lastName = lastName? lastName : '';
    return firstName + ' ' + _lastName;
  }
}
