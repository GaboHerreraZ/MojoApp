import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule

  ],
  exports:[RouterModule,
           ChartsModule,
          ]
})
export class ComunModule { }
