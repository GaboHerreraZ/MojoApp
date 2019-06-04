import { Injectable } from '@angular/core';
import { IngresosService } from './ingresos.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccessIngresosService {

  estadoCuenta = new Subject();

  constructor(private _ingresosService:IngresosService) { }

  public getEstadoCuenta() {
    return this.estadoCuenta.asObservable();
  }


  public getAccessEstadoCuenta() {
    this._ingresosService.getEstadoCuenta().subscribe((res: any) => {
      this.estadoCuenta.next(res);
    }, error => {
      this.estadoCuenta.next(error);
    });
  }

}
