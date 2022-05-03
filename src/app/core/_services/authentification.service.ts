import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, flatMap, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private currentUserSubject: BehaviorSubject<any>;
  private currentUserTokenSubject: BehaviorSubject<any>;

  name = "epitech-capstone"
  nameToken = "epitech-capstone-token"

  urlUser = `${environment.apiUrl}`

  constructor(private http: HttpClient, private router: Router, public analytics: AngularFireAnalytics) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this.name)));
    // @ts-ignore
    this.currentUserTokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this.nameToken)));

    setTimeout(() => {
      if (this.currentUserTokenValue) {
        this.infoMe().subscribe({
          next: (value: any) => {
            if (isDevMode()) {
              console.log(value)
            }
          },
          error: (err: any) => { }
        })
      }
    })
  }

  public get currentUserValue(): any {
    if (environment.authRequired) {
      return this.currentUserSubject.value;
    } else {
      return { username: 'Auth Required Desactivated', id: 0 }
    }
  }

  public get currentUserTokenValue(): any {
    if (environment.authRequired) {
      return this.currentUserTokenSubject.value;
    } else {
      return { username: 'Auth Required Desactivated', id: 0 }
    }
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.urlUser + 'token/refresh', {}).pipe(
      map((user: any) => {
        localStorage.setItem(this.nameToken, JSON.stringify(user));
        this.currentUserTokenSubject.next(user);
        return user;
      }));
  }

  infoMe(): Observable<any> {
    return this.http.get<any>(this.urlUser + 'me').pipe(
      map((user: any) => {
        localStorage.setItem(this.name, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.urlUser + 'users', { email, password })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'login', { email: email, password: password })
      .pipe(
        map((user: any) => {
          localStorage.setItem(this.nameToken, JSON.stringify(user));
          this.currentUserTokenSubject.next(user);
          this.analytics.setUserId(user.id)
          this.analytics.logEvent("login", { method: "Email", userId: user.id })
          return user;
        }));
  }

  logout(navig: boolean = true): void {
    localStorage.removeItem(this.name);
    localStorage.removeItem(this.nameToken);
    // @ts-ignore
    this.currentUserTokenSubject.next(null);
    this.currentUserSubject.next(null)
    /*     if (navig)
          this.router.navigate(['login']); */
  }

  modifyUsername(username: string): Observable<any> {
    return this.http.put<any>(this.urlUser + '/edit/', { username }).pipe(
      map((info: any) => {
        let userSave = this.currentUserValue
        userSave.username = username
        localStorage.setItem(this.name, JSON.stringify(userSave));
        this.currentUserSubject.next(userSave);
        return userSave;
      }));
  }

  modifyPassword(password: string): Observable<any> {
    return this.http.put<any>(this.urlUser + '/edit/password', { password });
  }

  modifyEmail(email: string): Observable<any> {
    return this.http.put<any>(this.urlUser + '/edit/email', { email }).pipe(
      map((info: any) => {
        let userSave = this.currentUserValue
        userSave.email = email
        localStorage.setItem(this.name, JSON.stringify(userSave));
        this.currentUserSubject.next(userSave);
        return userSave;
      }));;
  }

  removeMe(): Observable<any> {
    return this.http.post<any>(this.urlUser + '/delete/', {}).pipe(
      map((info: any) => {
        this.logout()
        return info
      }));
  }

  emptyMe(): Observable<any> {
    return this.http.post<any>(this.urlUser + '/empty/', {}).pipe(
      mergeMap((value: any) => {
        return this.infoMe()
      }
      ));
  }
}
