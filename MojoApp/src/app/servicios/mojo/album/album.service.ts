import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artista } from '../../../modelos/ArtistaModel';
import { Album } from '../../../modelos/AlbumModel';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albunes: Array<Album>;
  lastId: number;
  constructor() {
    this.albunes = new Array<Album>();
    let album: Album;
    for (let i = 0; i < 10; i++) {
      this.lastId = (i + 1);
      album = new Album(this.lastId, "Album " + this.lastId, "Artista " + this.lastId,
       "UPC " + this.lastId);
      this.albunes.push(album);
    }
  }

  public getAlbunes (): Observable<Album[]> {
    console.log("getAlbunes");
    console.log(this.albunes);
    return of(this.albunes);
  }

  public addAlbum (album: any): Observable<Album> {
    console.log("addAlbum");
    console.log(album);
    const newAlbum = new Album();
    const id = this.lastId + 1;
    
    try {
      newAlbum.id = id;
      newAlbum.titulo = album.titulo;
      newAlbum.artista = album.artista;
      newAlbum.upc = album.upc;
      newAlbum.tracks = album.tracks;
      newAlbum.afiliados = album.afiliados;
      this.albunes.push(newAlbum);
    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of(newAlbum);
  }

  public editAlbum (album: Album): Observable<Album> {
    console.log("editAlbum");
    console.log(album);
    let newAlbum = null;
    try {
      const index = this.buscarAlbum(album);

      if(index === -1)
        return null;

      newAlbum = this.albunes[index];

    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of(newAlbum);
  }

  public deleteAlbum (album: Album): Observable<boolean> {
    console.log("deleteAlbum");
    console.log(album);
    let index = -1;
    let response = false;
    try {
      // Ejecutar peticion post y en el response ejecutar:
      index = this.buscarAlbum(album);
      if (index > -1) {
        this.albunes.splice(index, 1);
        response = true;
      }
    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of (response);
  }

  public buscarAlbum(album: any): number {
    return this.albunes.findIndex((element) => {
      return element.id == album.id;
    });
  }
}
