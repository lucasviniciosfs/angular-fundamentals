import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('xxxx');
    return next.handle(request).pipe(
      tap(a => 
        console.log('teste '+a)
      ),
      catchError(err => {
          if (err.status === 401) {
              this.authService.logout();
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
        }
      )
    )
  }

}
