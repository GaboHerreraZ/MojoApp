import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpResponse, } from '@angular/common/http';
import { Operacion } from '../../../utilidades/operacion';


@Injectable({
  providedIn: 'root'
})

export class ArtistaService {

  constructor(private _http:HttpClient) {
  }



  public getArtistas (): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URL}${Operacion.getArtistas}`,{observe:'response'});
  }

  public getArtistasAfiliado(): Observable<HttpResponse<any>>{
    return this._http.get(`${Operacion.URL}${Operacion.getArtistasAfiliados}`,{observe:'response'});
  }

}
