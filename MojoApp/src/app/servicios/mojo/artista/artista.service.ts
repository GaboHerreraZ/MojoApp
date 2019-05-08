import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artista } from '../../../modelos/ArtistaModel';
@Injectable({
  providedIn: 'root'
})

export class ArtistaService {
  artistas: Array<Artista>;
  lastId: number;
  paises = ["Argentina", "Colombia", "Venezuela","Uruguay", "Ecuador", "Paraguay",
  "Brasil", "Peru", "Chile", "El Salvador", "Mexico", "Bolivia"];
  generos = ["Masculino", "Femenino", "LGBT", "No importa"];
  constructor() {
    this.artistas = new Array<Artista>();
    let artista: Artista;
    for (let i = 0; i < 10; i++) {
      this.lastId = (i + 1);
      artista = new Artista(this.lastId, "Juan Pablo " + this.lastId, "Raba Sarmiento " + this.lastId, this.paises[i], this.generos[0]);
      this.artistas.push(artista);
    }
    console.log(this.artistas);
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

  public editArtista (artista: any): Observable<boolean> {
    console.log("editArtista");
    console.log(artista);
    try {
      const index = this.buscarArtista(artista);

      if(index === -1)
        return null;

      this.artistas[index].nombres = artista.nombres;
      this.artistas[index].apellidos = artista.apellidos;
      this.artistas[index].pais = artista.pais;
      this.artistas[index].genero = artista.genero;
      this.artistas[index].spotify = artista.spotify;
      this.artistas[index].youtube = artista.youtube;
      this.artistas[index].facebook = artista.facebook;
      this.artistas[index].instagram = artista.instagram;

    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
      return of(false);
    }
    return of(true);
  }

  public buscarArtista(artista: any): number {
    return this.artistas.findIndex((element) => {
      return element.id == artista.id;
    });
  }

  public deleteArtista (artista: Artista): Observable<boolean> {
    console.log("deleteArtista");
    console.log(artista);
    let index = -1;
    let response = false;
    try {
      // Ejecutar peticion post y en el response ejecutar:
      index = this.buscarArtista(artista);
      if (index > -1) {
        this.artistas.splice(index, 1);
        response = true;
      }
    } catch (error) {
      console.log("Ocurrio una excepcion: " + error);
    }
    return of (response);
  }
}
