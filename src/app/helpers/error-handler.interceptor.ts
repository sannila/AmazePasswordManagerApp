import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpSerivceService } from '../services/http-serivce.service';
import { inject } from '@angular/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {

  const httpService = inject(HttpSerivceService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log("Response Error: ", err)
      if([401, 403].includes(err.status)){
        httpService.logout();
      }
      return throwError(() => err);
    })
  );
};
