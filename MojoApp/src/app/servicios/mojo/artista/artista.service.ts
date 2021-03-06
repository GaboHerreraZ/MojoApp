import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Operacion } from '../../../utilidades/operacion';
import { Constante } from 'src/app/utilidades/constante';


@Injectable({
  providedIn: 'root'
})

export class ArtistaService {

  constructor(private _http: HttpClient) {
  }

  /**
   * Method: getArtistas
   * ----------------------------------------------------
   * Obtiene el listado de artistas.
   * 
   * @return {Observable}   Listado de artistas
   */
  public getArtistas(): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URL}${Operacion.getArtistas}`, { observe: 'response' });
  }

  /**
   * Method: updateArtista
   * ----------------------------------------------------
   * Actualiza la información de un artista
   * 
   * @param  {Artista}    obArtista Información del artista
   * @return {Observable} Información de estado de la petición  
   */
  public updateArtista(obArtista: any): Observable<HttpResponse<any>> {
    return this._http.put(`${Operacion.URL}${Operacion.getArtistas}/${obArtista.id}`, obArtista, { observe: 'response' });
  }

  /**
   * Method: insertArtista
   * ----------------------------------------------------
   * Inserta un nuevo artista
   * 
   * @param  {Artista}    obArtista Información del nuevo artista
   * @return {Observable} Información de estado de la petición         
   */
  public insertArtista(obArtista: any): Observable<HttpResponse<any>> {
    return this._http.post(`${Operacion.URL}${Operacion.getArtistas}`, obArtista, { observe: 'response' });
  }


  public getArtistasAfiliado(): Observable<HttpResponse<any>> {
    return this._http.get(`${Operacion.URL}${Operacion.getArtistasAfiliados}`, { observe: 'response' });
  }

}
