import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Operacion } from '../../../utilidades/operacion';
import { Constante } from 'src/app/utilidades/constante';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  constructor(private _http: HttpClient) {
  }

  public getEstadoCuenta(): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URLACCOUNTING}${Operacion.estadoCuenta}`, { observe: 'response' });
  }

  public getIngresosPeriodo(): Observable<HttpResponse<any>> {
    var obParams = {
      "periodoInicial": '2019-03-01',
      "periodoFinal": '2019-06-01'
    }
    return this._http.get(`${Operacion.URLACCOUNTING}${Operacion.ingresosPorPeriodo}`, { observe: 'response' });
  }

  public getDetalleIngresos(obIngresoPeriodo: any): Observable<HttpResponse<any>> {
    var periodo = obIngresoPeriodo.perido + '-01';
    return this._http.get(`${Operacion.URLACCOUNTING}${Operacion.detalleIngresoEnPeriodo}?periodo=${periodo}&idAfiliado=91`, { observe: 'response' });
  }

}
