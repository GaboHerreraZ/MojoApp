import { Injectable, Pipe } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Constante } from '../../utilidades/constante';
import { getLocaleDateTimeFormat } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  private sesion:any;

  constructor(private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    let token: string = localStorage.getItem(Constante.keyToken);
    this.sesion = this._authService.getSesion();
    if(this.sesion === undefined){
          return false;
    }else{
          return this._authService.validateSesion();
    }

  }

  


}
