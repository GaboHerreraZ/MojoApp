import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Operacion } from '../../../../utilidades/operacion';

@Injectable({
  providedIn: 'root'
})
export class ArtistaAnaliticaService {

  constructor(private _http: HttpClient) {

  }

  /**
   * Method: getOyentes
   * ----------------------------------------------------
   * Obtine la información de Oyentes entre un periodo,
   * y para un artista y canal específico.
   * 
   * @param  {Any}        obParams Información de consulta de oyentes
   * @return {Observable} Oyentes por artista y canal  
   */
  public getOyentes(obParams: any): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URLARTISTANALITYCS}${Operacion.getOyentes}?periodoInicial=${obParams.periodoInicial}&periodoFinal=${obParams.periodoFinal}&artistaId=${obParams.artistaId}&canalId=${obParams.canalId}`, { observe: 'response' });
  }

  /**
   * Method: getOyentesPais
   * ----------------------------------------------------
   * Obtine la información de Oyentes de un artista por
   * país y canal.
   * 
   * @param  {Any}        obParams Información de consulta 
   *                               de oyentes por país
   * @return {Observable} Oyentes por país y canal 
   */
  public getOyentesPais(obParams: any): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URLARTISTANALITYCS}${Operacion.getOyentesPais}?fecha=${obParams.fecha}&canal=${obParams.canalId}&artista=${obParams.artistaId}`, { observe: 'response' });
  }

  /**
   * Method: getSeguidores
   * ----------------------------------------------------
   * Obtine la información de Seguidores del artista.
   * 
   * @param  {Any}        obParams Información de consulta de seguidores
   * @return {Observable} Información de Seguidores  
   */
  public getSeguidores(obParams: any): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URLARTISTANALITYCS}${Operacion.getSeguidores}?fecha=${obParams.fecha}&artistaId=${obParams.artistaId}`, { observe: 'response' });
  }
}
