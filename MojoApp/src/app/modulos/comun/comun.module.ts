import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SearchPipe } from '../../pipes/search.pipe';
import { LoadingComponent } from '../../componentes/loading/loading.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteComponent } from '../../elementos/autocomplete/autocomplete.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { GoogleChartsModule } from 'angular-google-charts';
import { PieChartComponent } from 'src/app/componentes/charts/pie-chart/pie-chart.component';
import { TableChartComponent } from 'src/app/componentes/charts/table-chart/table-chart.component';
import { LineChartComponent } from '../../componentes/charts/line-chart/line-chart.component';
import { ComboChartComponent } from '../../componentes/charts/combo-chart/combo-chart.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SearchPipe,
    LoadingComponent,
    AutocompleteComponent,
    PieChartComponent,
    TableChartComponent,
    LineChartComponent,
    ComboChartComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
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
           NgSelectModule,
           FormsModule,
           ReactiveFormsModule,
           NgxPaginationModule,
           NgbModule,
           GoogleChartsModule,
           SearchPipe,
           LoadingComponent,
           AutocompleteComponent,
           PieChartComponent,
           TableChartComponent,
           LineChartComponent,
           ComboChartComponent
          ]
})
export class ComunModule { }
