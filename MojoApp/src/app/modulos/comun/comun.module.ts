import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SearchPipe } from '../../pipes/search.pipe';
import { LoadingComponent } from '../../componentes/loading/loading.component';

@NgModule({
  declarations: [
    SearchPipe,
    LoadingComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(4,0,0,0.67)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  }),


  ],
  exports:[RouterModule,
           ChartsModule,
           NgxLoadingModule,
           SearchPipe,
           LoadingComponent
          ]
})
export class ComunModule { }
