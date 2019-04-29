import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artista } from '../../../modelos/ArtistaModel';
@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  artistas: Array<Artista>;
  lastId: number;
  constructor() {
    this.artistas = new Array<Artista>();
    let artista: Artista;
    for (let i = 0; i < 10; i++) {
      this.lastId = (i + 1);
      artista = new Artista(this.lastId, "Juan Pablo " + this.lastId, "Raba Sarmiento " + this.lastId);
      this.artistas.push(artista);
    }
  }

  public getArtistas (): Observable<Artista[]> {
    return of(this.artistas);
  }

  public addArtista (artista: any): Observable<Artista> {
    console.log("addArtista");
    console.log(artista);
    console.log("artistas");
    console.log(this.artistas);
    const newArtista = new Artista();
    const id = this.lastId + 1;
    
    try {
      newArtista.id = id;
      newArtista.nombres = artista.nombres;
      newArtista.apellidos = artista.apellidos;
      newArtista.pais = artista.pais;
      newArtista.genero = artista.genero;
      newArtista.spotify = artista.spotify;
      newArtista.facebook = artista.facebook;
      newArtista.youtube = artista.youtube;
      newArtista.instagram = artista.instagram;
      newArtista.afiliado = "Afiliado Ejemplo " + id;
      this.artistas.push(newArtista);
    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of(newArtista);
  }
}
