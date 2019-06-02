import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constante } from '../../../utilidades/constante';
import { Chart } from '../../../modelos/chart';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  constructor(private _title:Title){
        this._title.setTitle(Constante.tituloIngresos);
  }
  datos = datos;
  tops = tops;
  configChartPais:Chart;
  configChartCanal:Chart;
  configChartMes:Chart;

  ngOnInit(){
    this.configChartPais = new Chart(
      "Ganancia por pais",
      [
        ["Colombia", 1123],
        ["Argentina", 2623],
        ["Peru", 2556],
        ["Brasil", 233]
      ],
      ["País","Ingresos"]
    );
    
    this.configChartCanal = new Chart(
      "Ganancia por canal",
      [
        ["Spotify", 2623],
        ["Deezer", 2623],
        ["Itunes", 2556],
        ["Shazam", 233]
      ],
      ["Canal","Ingresos"]
    );

    this.configChartMes = new Chart(
      "Ganancia por mes",
      [
        ["Enero", 2423],
        ["Febrero", 2623],
        ["Marzo", 2556],
        ["Abril", 233],
        ["Mayo", 933],
        ["Junio", 833],
        ["Julio", 633],
        ["Agosto", 533],
        ["Septiembre", 443],
        ["Octubre", 235],
        ["Noviembre", 233],
        ["Diciembre", 2234]
      ],
      ["Mes","Ingresos"]
    );

  }

}

const datos:any[]=[
  {
    periodo:"20152015",
    total:"342343423",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  },
  {
    periodo:"2015",
    total:"34234",
    estado:"Pendiente"
  }

]

const tops:any[]=[
  {
    top:1,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:2,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:3,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:4,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:5,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:6,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:7,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:8,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:9,
    cancion:"Cancion 1",
    ingresos:"234234"
  },
  {
    top:10,
    cancion:"Cancion 1",
    ingresos:"234234"
  }
  
];
