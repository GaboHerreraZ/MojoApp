import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresosRoutingModule } from './ingresos.routing.module';
import { IngresosComponent } from '../ingresos.component';
import { ComunModule } from '../../../../modulos/comun/comun.module';
import { IngresoDetailComponent } from '../ingreso-detail/ingreso-detail.component';

@NgModule({
  declarations: [IngresosComponent, IngresoDetailComponent],
  imports: [
    CommonModule,
    ComunModule,
    IngresosRoutingModule
  ]
})
export class IngresosModule { }
