import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Operacion } from 'src/app/utilidades/operacion';

@Injectable({
  providedIn: 'root'
})
export class ComunesService {
  generos: any[];
  private subject = new Subject<any>();

  constructor(private _http: HttpClient) {
    this.generos = ["Masculino", "Femenino", "LGBT", "No importa"];
  }

  public getPaises(): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URLPAIS}${Operacion.getPaises}`, { observe: 'response' });
  }
  public getGeneros(): Observable<any[]> {
    return of(this.generos);
  }

  public confirm(config: any, siFn: () => void, noFn: () => void) {
    this.setConfirmation(config, siFn, noFn);
  }


  private setConfirmation(config: any, siFn: () => void, noFn: () => void) {
    const that = this;
    this.subject.next({
      type: config.type,
      titulo: config.titulo,
      mensaje: config.mensaje,
      showNegativeButton: config.showNegativeButton,
      showPositiveButton: config.showPositiveButton,
      positiveButtonText: config.positiveButtonText,
      negativeButtonText: config.negativeButtonText,
      siFn: function () {
        that.subject.next(); // this will close the modal
        siFn();
      },
      noFn: function () {
        that.subject.next();
        noFn();
      }
    });
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }



}
