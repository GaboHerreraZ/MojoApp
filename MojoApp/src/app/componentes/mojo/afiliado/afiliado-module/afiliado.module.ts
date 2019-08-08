import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfiliadoRoutingModule } from './afiliado-routing.module';
import { AfiliadoComponent } from '../afiliado.component';

@NgModule({
  declarations: [AfiliadoComponent],
  imports: [
    CommonModule,
    AfiliadoRoutingModule
  ]
})
export class AfiliadoModule { }
