import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistaRoutingModule } from './artista-routing.module';
import { ArtistaComponent } from '../artista.component';
import { ArtistaFormComponent } from '../artista-form/artista-form.component';
import { ArtistaDetailComponent } from '../artista-detail/artista-detail.component';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ComunModule } from 'src/app/modulos/comun/comun.module';

@NgModule({
  declarations: [ArtistaComponent, ArtistaFormComponent, ArtistaDetailComponent],
  imports: [
    CommonModule,
    ArtistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SweetAlert2Module,
    ComunModule
  ]
})
export class ArtistaModule { }
