import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate  {

  isLoggedIn$:Observable<boolean>;

  constructor(private _authService:AuthService,
              private _router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      this.isLoggedIn$ = this._authService.isLoggedIn();
      return this.isLoggedIn$;
  }

  
}
