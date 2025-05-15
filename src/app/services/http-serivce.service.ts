import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpSerivceService {
  baseURL: string = 'https://localhost:7125/api/';
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.userSubject = new BehaviorSubject(localStorage.getItem('jwtToken'));
      this.user = this.userSubject.asObservable();
    }
  }

  public get userValue() {
    return this.userSubject?.value;
  }

  get(endpoint: string): Observable<any> {    
    return this.http.get<any>(this.baseURL + endpoint, {headers: this.headers});
  }

  post(endpoint: string, request: any): Observable<any> {
    return this.http.post<any>(this.baseURL + endpoint, request, {headers: this.headers}).pipe(
      map((res) => {
        localStorage.setItem('jwtToken', res.jwtToken);
        this.userSubject.next(res.jwtToken);
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }
}
