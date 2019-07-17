import { Component, OnInit, Input } from '@angular/core';
import { config } from 'aws-sdk/global';
import { Chart } from '../../../modelos/chart';

@Component({
  selector: 'app-combo-chart',
  templateUrl: './combo-chart.component.html',
  styleUrls: ['./combo-chart.component.css']
})
export class ComboChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() config:Chart;

  title = 'Estadisticas por canal';
   type = 'ComboChart';
   data = [
      ["Spotify", 3, 2, 2.5],
      ["Youtube",2, 3, 2.5],
      ["Itunes", 1, 5, 3],
      ["Deezer", 3, 9, 6],
      ["Facebook", 10, 0, 6]

   ];
   columnNames = ['Datos', 'Followers','Streams','Average'];
   options = {   
      hAxis: {
         title: 'Canales'
      },
      vAxis:{
         title: 'Cantidad'
      },
      seriesType: 'bars',
      series: {2: {type: 'line'}}
   };
   width = 1140;
   height = 400;

}
