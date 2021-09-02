import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
   
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      tap(res => {
        // Catch when success
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMessage: HttpErrorResponse = error;
        if (error.status === 409) { 
          errorMessage.error.detail = error.error.detail;
          this.router.navigate(['/error-409']);
        }
        return throwError(errorMessage);
      })
    );
  }
}
