import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthentificationService } from '../_services/authentification.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '../_services/error.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthentificationService, private router: Router, private error: ErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url
    request = this.addTokenHeader(request)

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (!url.includes('login') && error.status === 401) {
            let toReturn = this.handle401Error(request, next);
            if (toReturn)
              return toReturn
            return throwError(() => error);
          } else {
            if (error.error.detail)
              this.error.showError("Error " + error.status + ": " + error.error.detail)
            else {
              this.error.showError("Error " + error.status + ": " + error.error.message)
            }
            if (isDevMode()) {
              console.error(error)
            }
          }
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.authenticationService.currentUserTokenValue.refresh_token)
      return this.authenticationService.refreshToken().pipe(
        switchMap((token: any) => {
          return next.handle(this.addTokenHeader(request)).pipe(
            catchError((error) => {
              this.error.showError("Error " + error.status + ": " + error.error.error)
              if (isDevMode()) {
                console.error(error)
              }
              return throwError(() => error);
            })
          );
        }),
        catchError((err) => {
          this.authenticationService.logout();
          return throwError(() => err);
        })
      );
    return undefined
  }

  private addTokenHeader(request: HttpRequest<any>) {
    const currentUserToken = this.authenticationService.currentUserTokenValue;
    const isLoggedIn = currentUserToken && currentUserToken.refresh_token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const url = this.router.url

    if (isLoggedIn && isApiUrl) {
      if (url === '/users/refresh') {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUserToken.refresh_token}`
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUserToken.token}`
          }
        });
      }
    }
    return request
  }
}
