import { Component, OnInit, Input } from '@angular/core';
import { Chart } from '../../../modelos/chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  @Input() configLine: Chart;

  ngOnInit() {
  }

  //title = 'Reproducciones por canal';
  type = 'LineChart';
  /*data = [
     ["Ene",  7.0, -0.2],
     ["Feb",  6.9, 0.8],
     ["Mar",  9.5,  5.7],
     ["Abr",  14.5, 11.3],
     ["May",  18.2, 17.0],
     ["Jun",  21.5, 22.0],
     ["Jul",  25.2, 24.8],
     ["Ago",  26.5, 24.1],
     ["Sep",  23.3, 20.1],
     ["Oct",  18.3, 14.1],
     ["Nov",  13.9,  8.6],
     ["Dic",  9.6,  2.5]
  ];*/
  //columnNames = ["Meses", "Spotify", "Itunes"];
  options = {
    hAxis: {
      title: 'Meses'
    },
    vAxis: {
      title: 'Oyentes'
    },
    curveType: 'function',
    legend: { position: 'bottom' },
    colors:["#fd365e","#feb50d"]
  };

  width = window.innerWidth <= 767 ? 500 : 1140;
  height = window.innerWidth <= 767 ? 500 : 400;


}
