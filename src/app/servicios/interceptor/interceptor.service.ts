import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpEvent, HttpHandler,HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constante } from 'src/app/utilidades/constante';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _authService:AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

  let sesion:any = this._authService.getSesion();

  request =  request.clone({
      headers: request.headers.set("Content-Type", "application/json")
    });

  request = request.clone({
    headers: request.headers.set("Authorization", `Bearer ${sesion.idToken.jwtToken}`)
  });

  return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
          }
        },
        error => {
          if (event instanceof HttpResponse) {
          }
        }
      )
    );
  }
}
