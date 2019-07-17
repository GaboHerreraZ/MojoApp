import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from '../../../environments/environment';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'zen-observable';
import { AlertService } from '../alert/alert.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<boolean>;
  public storage: any;
  public user:any;
  public sesion:any;

  constructor(private _router: Router,
    private _alertMessage: AlertService) {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public signIn(email: string, password: string) {
    return from(Auth.signIn(email, password)).pipe(
      tap((user) => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const { requiredAttributes } = user.challengeParam;
          this.loggedIn.next(false);
        } else {
          this.loggedIn.next(true);
        }
      })
    );
  }

  public confirmSignUp(email: string, password: string): Observable<any> {
    return from(Auth.confirmSignUp(email, password));
  }


  public getConfigure(){
    let cosa:any;
    let storages = Auth.configure({
        storage:cosa
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          this.loggedIn.next(false);
          this._alertMessage.error(error.message);
          return of(false);
        })
      );
  }

  public signOut() {
    from(Auth.signOut())
      .subscribe(
        (result: any) => {
          this.loggedIn.next(false);
          this.sesion = undefined;
          this._router.navigate(['/login']);
        },
        (error) => {
          this._alertMessage.error(error.message);
        }
      );
  }

  public completePassword(user: any, newPassword: string, required: any) {
    return from(Auth.completeNewPassword(user, newPassword, required)).pipe(tap(
      (user: any) => {
        this.loggedIn.next(true);
      }
    ));
  }

  public getCurrentSesion(){
      return from(Auth.currentSession()).pipe(tap());
  }

  public setSesion(sesion:any){
    this.sesion = sesion;
  }

  public getSesion(){
    return this.sesion;
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public setConfig() {
    let config = Auth.configure({ storage: this.storage });
    localStorage.setItem('config', JSON.stringify(config));
  }

  public  validateSesion():boolean{
    let currentTime = new Date().getTime();
    let nextTime = `${this.sesion.idToken.payload.exp}000`;
    
    let token = this.sesion.idToken.jwtToken;

      if(token === undefined){
        this._router.navigate(['/login']);
        return false;
      }
      if(currentTime > Number(nextTime)){
          this._router.navigate(['/login']);
          return false;
      }

      return true;
  }


}
