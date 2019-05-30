import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Constante } from '../../utilidades/constante';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {


  constructor(private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let token: string = localStorage.getItem(Constante.keyToken);
    let login: boolean = true;
    if (!token) {
      login = false;
      this._router.navigate['/login'];
    }
    return login;
  }


}
