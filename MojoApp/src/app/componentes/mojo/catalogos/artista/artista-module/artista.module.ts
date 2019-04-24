import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistaRoutingModule } from './artista-routing.module';
import { ArtistaComponent } from '../artista.component';

@NgModule({
  declarations: [ArtistaComponent],
  imports: [
    CommonModule,
    ArtistaRoutingModule
  ]
})
export class ArtistaModule { }
