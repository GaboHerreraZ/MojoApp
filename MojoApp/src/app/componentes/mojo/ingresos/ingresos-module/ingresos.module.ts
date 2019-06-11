import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresosRoutingModule } from './ingresos.routing.module';
import { IngresosComponent } from '../ingresos.component';
import { ComunModule } from '../../../../modulos/comun/comun.module';
import { IngresoDetailComponent } from '../ingreso-detail/ingreso-detail.component';
import { NgxBootstrapModule } from '../../../../modulos/ngx-bootstrap/ngx-bootstrap.module';
import { AngularMaterialModule } from '../../../../modulos/angular-material/angular-material.module';

@NgModule({
  declarations: [IngresosComponent, IngresoDetailComponent],
  imports: [
    CommonModule,
    ComunModule,
    NgxBootstrapModule,
    IngresosRoutingModule,
    AngularMaterialModule
  ]
})
export class IngresosModule { }
