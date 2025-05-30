import { Component, Input, OnInit } from '@angular/core';
import { HttpSerivceService } from '../../services/http-serivce.service';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, MenuModule, Menu, RouterModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;

  menuItems: MenuItem[] | undefined;
  isAdmin: boolean = false;

  constructor(
    private httpService: HttpSerivceService,
    private router: Router,
    private userService: UserService
  ) {
    if (!this.httpService.userValue) {
      // this.httpService.logout();
      this.router.navigate(['/home']);
      return;
    }
    this.isAdmin = userService.isAdmin();
  }

  ngOnInit(): void {
    this.menuItems = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user-edit',
            command: () => this.router.navigate(['/dashboard/profile']),
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => this.signOut(),
          },
        ],
      },
    ];
  }

  navigateTo(routeTo: string) {
    switch (routeTo) {
      case 'user':
        this.router.navigate(['/dashboard/user']);
        break;

      default:
        break;
    }
  }

  signOut() {
    this.httpService.logout();
  }
}
