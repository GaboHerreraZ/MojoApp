import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Title }     from '@angular/platform-browser';
import { Constante } from 'src/app/utilidades/constante';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccessComunesService } from '../../../../servicios/mojo/comunes/access.comunes.service';
import { AlertService } from '../../../../servicios/alert/alert.service';
import { Mensaje } from '../../../../utilidades/mensaje';
import { AccessArtistaService } from '../../../../servicios/mojo/artista/access.artista.service';
import { Chart } from '../../../../modelos/chart';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit {


  consultaForm:FormGroup;
  configChartPais:Chart;
  configCanalLine:Chart;
  tops = tops;
 
  loading:boolean;
  canales:any[];
  artistas:any[];

  constructor(private _tittleService:Title,
              private _formBuilder:FormBuilder,
              private _comunService:AccessComunesService,
              private _message:AlertService,
              private _serviciosArtista:AccessArtistaService) { 
                this._tittleService.setTitle(Constante.tituloAnalitica);
              }     

  ngOnInit() {
    this.setVariables();
  }
  


  
  setVariables(){
    this.consultaForm = this._formBuilder.group({
      fechaInicio:[''],
      fechaFinal:[''],
      canal:['']
    });
    this.getCanales();
    //this.getArtistas();

    this.configChartPais = new Chart(
      "",
      [
        ["Colombia", 1123],
        ["Argentina", 2623],
        ["Peru", 2556],
        ["Brasil", 233]
      ],
      ["País","Ingresos"]
    );


    this.configCanalLine = new Chart(
      "Reproducciones por canal",
      [
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
     ],
     ["Meses", "Spotify", "Itunes"]
    );

  }


  public getCanales() {
    this.loading= true;
    var me = this;
    me._comunService.getCanales();
    me._comunService.getAccesCanales().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.canales = res.body.canales;
        me.loading = false;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

  /*
  public getArtistas() {
    this._serviciosArtista.getAccessArtistas();
    this._serviciosArtista.getArtistas().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        this.artistas = res.body.result.data;
        this.loading = false;
      } else {
        this._message.error(res);
      }
    }, error => {
      this._message.error(Mensaje.noBackEnd);
    });
  }*/




}


const tops:any[]=[
  {
    top:1,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:2,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:3,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:4,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:5,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:6,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:7,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:8,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:9,
    cancion:"Artista 1",
    ingresos:"234234"
  },
  {
    top:10,
    cancion:"Artista 1",
    ingresos:"234234"
  }
  
];
