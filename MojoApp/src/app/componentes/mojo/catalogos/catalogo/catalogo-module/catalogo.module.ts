import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogosComponent } from '../catalogos.component';
import { ComunModule } from '../../../../../modulos/comun/comun.module';
import { DataTablesModule } from 'angular-datatables';
//import { AlertComponent } from '../../../../alert/alert.component';
@NgModule({
  declarations: [CatalogosComponent/*, AlertComponent*/],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ComunModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class CatalogoModule { }
