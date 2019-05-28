import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessComunesService {

  paises = new Subject();

  constructor(private _comunesService: ComunesService) { }

  public getAccessPaises() {
    this._comunesService.getPaises().subscribe((res: any) => {
      this.paises.next(res);
    }, error => {
      this.paises.next(error);
    });
  }

  public getPaises() {
    return this.paises.asObservable();
  }
}
