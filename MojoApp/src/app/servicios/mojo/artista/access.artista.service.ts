import { Injectable } from '@angular/core';
import { ArtistaService } from './artista.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessArtistaService {

  artistas = new Subject();
  artistasAfiliado = new Subject();
  nuevoArtista = new Subject();
  edicionArtista = new Subject();


  constructor(private _artistaService: ArtistaService) { }

  public getAccessArtistas() {
    this._artistaService.getArtistas().subscribe((res: any) => {
      this.artistas.next(res);
    }, error => {
      this.artistas.next(error);
    });
  }

  public updateAccessArtista(obArtista: any) {
    this._artistaService.updateArtista(obArtista).subscribe((res: any) => {
      this.edicionArtista.next(res);
    }, error => {
      this.edicionArtista.next(error);
    });
  }

  public insertAccessArtista(obArtista: any) {
    this._artistaService.insertArtista(obArtista).subscribe((res: any) => {
      this.nuevoArtista.next(res);
    }, error => {
      this.nuevoArtista.next(error);
    });
  }

  public getAccessArtistasAfiliado() {
    this._artistaService.getArtistasAfiliado().subscribe((res: any) => {
      this.artistasAfiliado.next(res);
    }, error => {
      this.artistasAfiliado.next(error);
    });
  }

  public getArtistas() {
    return this.artistas.asObservable();
  }

  public getNuevoArtista() {
    return this.nuevoArtista.asObservable();
  }

  public getEdicionArtista() {
    return this.edicionArtista.asObservable();
  }

  public getArtistasAfiliado() {
    return this.artistasAfiliado.asObservable();
  }


}
