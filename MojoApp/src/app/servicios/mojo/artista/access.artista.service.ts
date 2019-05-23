import { Injectable } from '@angular/core';
import { ArtistaService } from './artista.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessArtistaService {

artistas = new Subject();
artistasAfiliado = new Subject();
constructor(private _artistaService:ArtistaService) { }

 public getAccessArtistas(){
   this._artistaService.getArtistas().subscribe((res:any)=>{
     this.artistas.next(res);
   },error=>{
    this.artistas.next(error);
   });
 }

 public getAccessArtistasAfiliado(){
  this._artistaService.getArtistasAfiliado().subscribe((res:any)=>{
    this.artistasAfiliado.next(res);
  },error=>{
    this.artistasAfiliado.next(error);
  });
}



 public getArtistas(){
    return this.artistas.asObservable();
 }

 public getArtistasAfiliado(){
   return this.artistasAfiliado.asObservable();
 }


}
