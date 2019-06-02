import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistaRoutingModule } from './artista-analitica-routing.module';
import { ArtistaAnaliticaComponent } from '../artista-analitica.component';
import { ComunModule } from '../../../../../modulos/comun/comun.module';

@NgModule({
  declarations: [ArtistaAnaliticaComponent],
  imports: [
    CommonModule,
    ArtistaRoutingModule,
    ComunModule
  ]
})
export class ArtistaAnaliticaModule { }
