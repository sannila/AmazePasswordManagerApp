import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpSerivceService } from '../services/http-serivce.service';

export const jwtTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  console.log('Http Request', req);
  const httpService = inject(HttpSerivceService);
  const token = httpService.userValue;

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  return next(req);
};
