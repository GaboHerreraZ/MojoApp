import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessComunesService {

  paises = new Subject();
  generos$ = new Subject();

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


  getGeneros(){
    this._comunesService.getGeneros().subscribe((res:any)=>{
      this.generos$.next(res);
    }, error => {
      this.generos$.next(error);
    })
  }

  getAccessGeneros(){
    return this.generos$.asObservable();
  }
}
