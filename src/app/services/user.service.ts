import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({providedIn: 'root'})
export class UserService {
    private userSubject = new BehaviorSubject<UserModel | null>(this.getUserFromStorage());

    private getUserFromStorage(): UserModel | null {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored): null;
    }


    setUser(user: UserModel){
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }

    getUser(): UserModel | null {
        return this.userSubject.value;
    }

    clearUser(): void {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }
}