import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogosComponent } from '../catalogos.component';
import { ComunModule } from '../../../../modulos/comun/comun.module';

@NgModule({
  declarations: [CatalogosComponent],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ComunModule
  ]
})
export class CatalogoModule { }
