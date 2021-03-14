import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, take, filter, switchMap } from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthenticationToken(request)).pipe(

      catchError((error: HttpErrorResponse) => {

        if (request.url.includes('refreshtoken') || request.url.includes("oauth/token")) {
          // We do another check to see if refresh token failed
          // In this case we want to logout user and to redirect it to login page

          if (request.url.includes("refreshtoken")) {
            //this.authService.logout();
          }

          // return Observable.throw(error);
          return throwError(error);
        }

        if (error.status == 401) {
          return throwError(error);
        }

        if (this.refreshTokenInProgress) {
          return this.refreshTokenSubject.pipe(
            filter(request => request != null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request)))
          );
        } else {
          this.refreshTokenInProgress = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refreshAccessToken().pipe(
            switchMap((token: any) => {
              this.refreshTokenSubject.next(token);
              this.refreshTokenInProgress = false;
              return next.handle(this.addAuthenticationToken(request));
            })
          ),
            catchError(error => {
              this.refreshTokenInProgress = false;
              // this.authService.logout();
              return Observable.throw(error);
            });
        }

      })
    );

  }

  addAuthenticationToken(request) {
    // Get access token from Local Storage
    //this.authService.getAccessToken();
    const accessToken = null;
    if (!accessToken) {
      return request;
    }


    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

  }
}
