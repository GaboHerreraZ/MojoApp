import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SearchPipe } from '../../pipes/search.pipe';
import { LoadingComponent } from '../../componentes/loading/loading.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteComponent } from '../../elementos/autocomplete/autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { GoogleChartsModule } from 'angular-google-charts';
import { PieChartComponent } from 'src/app/componentes/charts/pie-chart/pie-chart.component';
import { TableChartComponent } from 'src/app/componentes/charts/table-chart/table-chart.component';

@NgModule({
  declarations: [
    SearchPipe,
    LoadingComponent,
    AutocompleteComponent,
    PieChartComponent,
    TableChartComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    GoogleChartsModule,
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
           NgxLoadingModule,
           ReactiveFormsModule,
           NgxPaginationModule,
           NgbModule,
           GoogleChartsModule,
           SearchPipe,
           LoadingComponent,
           AutocompleteComponent,
           PieChartComponent,
           TableChartComponent

          ]
})
export class ComunModule { }
