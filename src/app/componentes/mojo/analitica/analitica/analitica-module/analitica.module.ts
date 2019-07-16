import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnaliticaRoutingModule } from './analitica.routing.module';
import { AnaliticaComponent } from '../analitica.component';
import { ComunModule } from 'src/app/modulos/comun/comun.module';

@NgModule({
  declarations: [AnaliticaComponent],
  imports: [
    CommonModule,
    ComunModule,
    AnaliticaRoutingModule
  ]
})
export class AnaliticaModule { }
