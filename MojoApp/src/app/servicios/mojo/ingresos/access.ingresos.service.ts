import { Injectable } from '@angular/core';
import { IngresosService } from './ingresos.service';

@Injectable({
  providedIn: 'root'
})
export class AccessIngresosService {

  constructor(private _ingresosService:IngresosService) { }
}
