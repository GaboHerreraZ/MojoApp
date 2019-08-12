import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnticipoRoutingModule } from './anticipo-routing.module';
import { AnticipoComponent } from '../anticipo.component';

@NgModule({
  declarations: [AnticipoComponent],
  imports: [
    CommonModule,
    AnticipoRoutingModule
  ]
})
export class AnticipoModule { }
