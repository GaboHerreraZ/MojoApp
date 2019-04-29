import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Pais {
  constructor(public id: number, public nombre: string, code: string){
  }
}
export class Genero {
  constructor(public id: number, public nombre: string, code: string){
  }
}
export class ComunesService {
  paises: Pais[];
  generos: Genero[];
  private subject = new Subject<any>();

  constructor() {
    this.paises = [
      new Pais(1, "Argentina", "ar"),
      new Pais(2, "Colombia", "co"),
      new Pais(3, "Venezuela", "ve")
    ];

    this.generos = [
      new Pais(1, "Masculino", "M"),
      new Pais(2, "Femenino", "F"),
      new Pais(3, "LGBT", "LGBT"),
      new Pais(4, "No importa", "None"),
    ];
  }

  public getPaises(): Observable<Pais[]> {
    return of(this.paises);
  }
  public getGeneros(): Observable<Genero[]> {
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
