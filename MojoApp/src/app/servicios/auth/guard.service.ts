import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate  {


  constructor(private _authService:AuthService,
              private _router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this._authService.isLoggedIn().pipe(map(res =>{
        if(res){
          return res;
        }else{
          this._router.navigate(['/login']);
        }
        }));
  }

  
}
