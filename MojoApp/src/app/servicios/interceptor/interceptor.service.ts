import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpEvent, HttpHandler,HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  request.clone({
      headers: request.headers.set("Content-Type", "application/json")
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
