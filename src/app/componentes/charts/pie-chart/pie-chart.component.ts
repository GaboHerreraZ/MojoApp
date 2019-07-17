import { Component, OnInit, Input } from '@angular/core';
import { Chart } from '../../../modelos/chart';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() configChart: Chart;

  type = 'PieChart';
  options = {
    pieStartAngle: 100
  };
  width = window.innerWidth <= 767 ? "100%" : 380;
  height = window.innerWidth <= 767 ? "100%" : 350;
}
