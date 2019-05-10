import { Injectable } from '@angular/core';
import { ArtistaService } from './artista.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessArtistaService {

artistas = new Subject();
constructor(private _artistaService:ArtistaService) { }

 public getAccessArtistas(){
   this._artistaService.getArtistas().subscribe((res:any)=>{
     this.artistas.next(res);
   });
 }

 public getArtistas(){
    return this.artistas.asObservable();
 }



}
