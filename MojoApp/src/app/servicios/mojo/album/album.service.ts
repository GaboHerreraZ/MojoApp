import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artista } from '../../../modelos/ArtistaModel';
import { Album } from '../../../modelos/AlbumModel';
import { Track } from '../../../modelos/TrackModel';
import { ArtistaService } from '../artista/artista.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit{
  albunes: Array<Album>;
  artistas: Array<Artista>;
  lastId: number;
  constructor(private serviciosArtista: ArtistaService) {
    this.albunes = new Array<Album>();
    this.getArtistas();
  }

  public initAlbunes(){
    let album: Album;
    for (let i = 0; i < 10; i++) {
      this.lastId = (i + 1);
      album = new Album(this.lastId, "Album " + this.lastId, "UPC " + this.lastId, this.artistas[i]);
      this.albunes.push(album);
    }
  }

  public getAlbunes (): Observable<Album[]> {
    console.log("albumService.getAlbunes");
    console.log(this.albunes);
    return of(this.albunes);
  }

  public addAlbum (album: any, tracks: Track[]): Observable<Album> {
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
      newAlbum.tracks = tracks;
      this.albunes.push(newAlbum);
    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of(newAlbum);
  }

  public editAlbum (album: Album): Observable<Album> {
    console.log("editAlbum");
    console.log(album);
    try {
      const index = this.buscarAlbum(album);

      if(index === -1)
        return null;
      
      this.albunes[index] = album;
      
    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of(album);
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

  public getArtistas() {
    this.serviciosArtista.getArtistas().subscribe(artistas => {
      this.artistas = artistas;
      this.initAlbunes();
    });
  }

  ngOnInit(){
    //this.getArtistas();
  }
}
