import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpSerivceService } from './http-serivce.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<UserModel | null>(
    this.getUserFromStorage()
  );

  constructor(private httpService: HttpSerivceService) {}

  private getUserFromStorage(): UserModel | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  setUser(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): UserModel | null {
    return this.userSubject.value;
  }

  isAdmin() {
    return this.userSubject.value.role == 'Admin' ? true : false;
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUserList(): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.httpService
        .get('user')
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  getUserById(userId: number): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.httpService
        .getById('user', userId)
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }
}
