import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Title }     from '@angular/platform-browser';
import { Constante } from 'src/app/utilidades/constante';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit {

  constructor(private _tittleService:Title,
              ) { 

                this._tittleService.setTitle(Constante.tituloAnalitica);
  }

  ngOnInit() {
  }


}
