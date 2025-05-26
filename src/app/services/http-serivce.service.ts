import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpSerivceService {
  baseURL: string = 'https://localhost:7125/api/';
  private userSubject: BehaviorSubject<any>;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  public user: Observable<any>;
  headers = new HttpHeaders().set('content-type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.userSubject = new BehaviorSubject(localStorage.getItem('jwtToken'));
      this.user = this.userSubject.asObservable();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private hasToken(): boolean {
    return this.isBrowser() && !!localStorage.getItem('jwtToken');
  }

  public get userValue() {
    return this.userSubject?.value;
  }

  get(endpoint: string): Observable<any> {
    return this.http.get<any>(this.baseURL + endpoint, {
      headers: this.headers,
    });
  }

  getById(endpoint: string, id: number): Observable<any>{
    const url = `${this.baseURL}${endpoint}/${id}`
    return this.http.get<any>(url, {headers: this.headers});
  }

  getByIdList(endPoint: string, id: any[]): Observable<any>{
    const url = `${this.baseURL}${endPoint}`
    return this.http.post<any>(url, id, {headers: this.headers});
  }

  login(endpoint: string, request: any): Observable<any> {
    return this.http
      .post<any>(this.baseURL + endpoint, request, { headers: this.headers })
      .pipe(
        map((res) => {
          localStorage.setItem('jwtToken', res.jwtToken);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.loggedIn.next(true);
          this.userSubject.next(res.jwtToken);
          return res;
        })
      );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }
}
