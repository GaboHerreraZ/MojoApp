import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistaRoutingModule } from './artista-routing.module';
import { ArtistaComponent } from '../artista.component';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [ArtistaComponent],
  imports: [
    CommonModule,
    ArtistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SweetAlert2Module
  ]
})
export class ArtistaModule { }