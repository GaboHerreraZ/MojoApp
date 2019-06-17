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
  }

  public getPaises(): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URLPAIS}${Operacion.getPaises}`, { observe: 'response' });
  }
  
  getGeneros():Observable<HttpResponse<any>>{
    return this._http.get(`${Operacion.URLGENERO}${Operacion.getGeneros}`,{observe:'response'});
  }

  getCanales():Observable<HttpResponse<any>>{
    return this._http.get(`${Operacion.URLCANAL}${Operacion.getCanales}`,{observe:'response'});
  }



  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  


  //* Metodo para probar los servicios que se van creado */
  public metodoPruebas():Observable<HttpResponse<any>>{
    //Agregar URL nuevas en operación
    return this._http.get(`${Operacion.URLPAIS}${Operacion.getPaises}`, { observe: 'response' });

  }



}
