import { Injectable } from '@angular/core';
import { IngresosService } from './ingresos.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccessIngresosService {

  estadoCuenta = new Subject();
  ingresosPeriodo = new Subject();
  detalleIngresos = new Subject();;

  constructor(private _ingresosService:IngresosService) { }

  public getEstadoCuenta() {
    return this.estadoCuenta.asObservable();
  }

  public getIngresosPeriodo() {
    return this.ingresosPeriodo.asObservable();
  }

  public getDetalleIngresosPeriodo() {
    return this.detalleIngresos.asObservable();
  }

  public getAccessEstadoCuenta() {
    this._ingresosService.getEstadoCuenta().subscribe((res: any) => {
      this.estadoCuenta.next(res);
    }, error => {
      this.estadoCuenta.next(error);
    });
  }

  public getAccessIngresosPeriodo() {
    this._ingresosService.getIngresosPeriodo().subscribe((res: any) => {
      this.ingresosPeriodo.next(res);
    }, error => {
      this.ingresosPeriodo.next(error);
    });
  }  

  public getAccessDetalleIngresos() {
    this._ingresosService.getDetalleIngresos().subscribe((res: any) => {
      this.detalleIngresos.next(res);
    }, error => {
      this.detalleIngresos.next(error);
    });
  }

}
