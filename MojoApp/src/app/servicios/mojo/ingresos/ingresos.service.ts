import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Operacion } from '../../../utilidades/operacion';
import { Constante } from 'src/app/utilidades/constante';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  constructor(private _http: HttpClient) {
  }

  public getEstadoCuenta(): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URLACCOUNTING}${Operacion.getEstadoCuenta}`, { observe: 'response' });
  }
}
