import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
}
