import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule
  ],
  exports:[
    MatChipsModule,
    MatIconModule
  ]
})
export class AngularMaterialModule { }
