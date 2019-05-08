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
  }

  public initAlbunes(){
    let album: Album;
    let artista: Artista;
    for (let i = 0; i < 10; i++) {
      this.lastId = (i + 1);
      artista = new Artista();
      artista.afiliado = this.artistas[i].afiliado;
      artista.apellidos = this.artistas[i].apellidos;
      artista.facebook = this.artistas[i].facebook;
      artista.genero = this.artistas[i].genero;
      artista.id = this.artistas[i].id;
      artista.instagram = this.artistas[i].instagram;
      artista.nombres = this.artistas[i].nombres;
      artista.pais = this.artistas[i].pais;
      artista.spotify = this.artistas[i].spotify;
      artista.youtube = this.artistas[i].youtube;
      album = new Album(this.lastId, "Album " + this.lastId, "UPC " + this.lastId, artista);
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

      this.albunes[index].artista = album.artista;
      this.albunes[index].titulo = album.titulo;
      this.albunes[index].upc = album.upc;
      this.albunes[index].tracks = album.tracks;
      this.albunes[index].afiliados = album.afiliados;

    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of(album);
  }

  public deleteAlbum (album: Album): Observable<boolean> {
    console.log("deleteAlbum");
    console.log(album);
    let index = -1;
    try {
      index = this.buscarAlbum(album);
      if (index > -1)
        this.albunes.splice(index, 1);
      
    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
      return of (false);
    }
    return of (true);
  }

  public buscarAlbum(album: any): number {
    return this.albunes.findIndex((element) => {
      return element.id == album.id;
    });
  }

  public getArtistas() {
    this.serviciosArtista.getArtistas().subscribe(artistas => {
      this.artistas = artistas;
    });
  }

  ngOnInit(){
    this.getArtistas();
    this.initAlbunes();
  }
}
