import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpResponse, HttpHeaders } from '@angular/common/http';
import { Artista } from '../../../modelos/ArtistaModel';


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor(private _http:HttpClient) {
  }



  public getArtistas (): Observable<HttpResponse<any>> {
    const httpHeaders = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this._http.get('https://nc9zg4qil3.execute-api.us-east-1.amazonaws.com/desa/artistas',
    {observe:'response',headers:httpHeaders});
  }

}
