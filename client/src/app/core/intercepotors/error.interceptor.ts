import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { state } from '@angular/animations';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.toast.error(error.error.title, error.status.toString());
            }
          }
          if (error.status === 401)
            this.toast.error(error.error.title, error.status.toString());
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
          if (error.status === 404) this.router.navigateByUrl('/not-found');
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}