import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComunesService {
  paises: any[];
  generos: any[];
  private subject = new Subject<any>();

  constructor() {
    this.paises = ["Argentina", "Colombia", "Venezuela","Uruguay", "Ecuador", "Paraguay",
    "Brasil", "Peru", "Chile", "El Salvador", "Mexico", "Bolivia"];

    this.generos = ["Masculino", "Femenino", "LGBT", "No importa"];
  }

  public getPaises(): Observable<any[]> {
    return of(this.paises);
  }
  public getGeneros(): Observable<any[]> {
    return of(this.generos);
  }

  public confirm(config: any, siFn: () => void, noFn: () => void) {
    console.log("confirm");
    this.setConfirmation(config, siFn, noFn);
  }


  private setConfirmation(config: any, siFn: () => void, noFn: () => void) {
    console.log("setConfirmation");
    const that = this;
    this.subject.next({
      type: config.type,
      titulo: config.titulo,
      mensaje: config.mensaje,
      showNegativeButton: config.showNegativeButton,
      showPositiveButton: config.showPositiveButton,
      positiveButtonText: config.positiveButtonText,
      negativeButtonText: config.negativeButtonText,
      siFn: function() {
        that.subject.next(); // this will close the modal
        siFn();
      },
      noFn: function() {
        that.subject.next();
        noFn();
      }
    });
   }

  public getMessage(): Observable<any> {
    console.log("getMessage");
    console.log(this.subject);
    return this.subject.asObservable();
  }
}
