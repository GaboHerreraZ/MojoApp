import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogosComponent } from '../catalogos.component';
import { ComunModule } from '../../../../../modulos/comun/comun.module';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AlbumComponent } from '../album/album.component';
import { TrackComponent } from '../track/track.component';
import { ArtistaPopupComponent } from '../../../popup/artista-popup/artista-popup.component';

@NgModule({
  declarations: [CatalogosComponent,AlbumComponent,TrackComponent,ArtistaPopupComponent],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ComunModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class CatalogoModule { }
