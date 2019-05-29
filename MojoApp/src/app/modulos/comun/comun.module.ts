import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SearchPipe } from '../../pipes/search.pipe';
import { LoadingComponent } from '../../componentes/loading/loading.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteComponent } from '../../elementos/autocomplete/autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    SearchPipe,
    LoadingComponent,
    AutocompleteComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
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
           ReactiveFormsModule,
           NgxPaginationModule,
           SearchPipe,
           LoadingComponent,
           AutocompleteComponent

          ]
})
export class ComunModule { }
