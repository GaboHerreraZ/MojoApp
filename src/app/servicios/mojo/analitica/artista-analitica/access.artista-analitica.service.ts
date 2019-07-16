import { Injectable } from '@angular/core';
import { ArtistaAnaliticaService } from './artista-analitica.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccessArtistaAnaliticaService {

    oyentes = new Subject();
    oyentesPais = new Subject();
    seguidores = new Subject();

    constructor(private _artistaAnaliticaService: ArtistaAnaliticaService) {

    }

    public getOyentes() {
        return this.oyentes.asObservable();
    }

    public getOyentesPais() {
        return this.oyentesPais.asObservable();
    }

    public getSeguidores() {
        return this.seguidores.asObservable();
    }

    public getAccessOyentes(obParams: any) {
        this._artistaAnaliticaService.getOyentes(obParams).subscribe((res: any) => {
            this.oyentes.next(res);
        }, error => {
            this.oyentes.next(error);
        });
    }

    public getAccessOyentesPais(obParams: any) {
        this._artistaAnaliticaService.getOyentesPais(obParams).subscribe((res: any) => {
            this.oyentesPais.next(res);
        }, error => {
            this.oyentesPais.next(error);
        });
    }

    public getAccessSeguidores(obParams: any) {
        this._artistaAnaliticaService.getSeguidores(obParams).subscribe((res: any) => {
            this.seguidores.next(res);
        }, error => {
            this.seguidores.next(error);
        });
    }
}
