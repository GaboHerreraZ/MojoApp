import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Title }     from '@angular/platform-browser';
import { Constante } from 'src/app/utilidades/constante';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  tops = tops1;
 
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
      fechaInicio:['',Validators.required],
      fechaFinal:['',Validators.required],
      canal:['',Validators.required]
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
      ["País","Ingresos"],
      null
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
     ["Meses", "Spotify", "Itunes"],
     null
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
        me.loading = false;
        me._message.error(res);
      }
    }, error => {
      me.loading = false;
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

  get hola(){
    console.log("aaaa");
    return;
  }

  consultar(){
    switch (this.tops){
      case tops1 :
        this.tops = tops2;
        this.configChartPais = new Chart(
          "",
          [
            ["Colombia", 1242],
            ["Argentina", 1234],
            ["Peru", 4556],
            ["Brasil", 133]
          ],
          ["País","Ingresos"],
          null
        );
    
    
        this.configCanalLine = new Chart(
          "Reproducciones por canal",
          [
            ["Ene",  8.0, 2.2],
            ["Feb",  7.9, 3.8],
            ["Mar",  6.5,  5.7],
            ["Abr",  19.5, 11.3],
            ["May",  8.2, 10.0],
            ["Jun",  22.5, 21.0],
            ["Jul",  21.2, 20.8],
            ["Ago",  26.5, 21.1],
            ["Sep",  23.3, 18.1],
            ["Oct",  18.3, 11.1],
            ["Nov",  12.9,  5.6],
            ["Dic",  10.6,  3.5]
         ],
         ["Meses", "Spotify", "Itunes"],
         null
        );
        break;
      case tops2 :
        this.tops = tops1;
        this.configChartPais = new Chart(
          "",
          [
            ["Colombia", 1123],
            ["Argentina", 2623],
            ["Peru", 2556],
            ["Brasil", 233]
          ],
          ["País","Ingresos"],
          null
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
         ["Meses", "Spotify", "Itunes"],
         null
        );
        break;  
    }
  }


}


const tops1:any[]=[
  {
    top:1,
    cancion:"Axel Rose",
    ingresos:"234.234"
  },
  {
    top:2,
    cancion:"Gustavo Cerati",
    ingresos:"123.412"
  },
  {
    top:3,
    cancion:"Enrique Bumbury",
    ingresos:"234.565"
  },
  {
    top:4,
    cancion:"Juanes",
    ingresos:"234.211"
  },
  {
    top:5,
    cancion:"Shakira",
    ingresos:"2345"
  },
  {
    top:6,
    cancion:"La ley",
    ingresos:"122.32"
  },
  {
    top:7,
    cancion:"Kraken",
    ingresos:"124.433"
  },
  {
    top:8,
    cancion:"Akash",
    ingresos:"172.342"
  },
  {
    top:9,
    cancion:"Aterciopelados",
    ingresos:"234.342"
  },
  {
    top:10,
    cancion:"Metallica",
    ingresos:"90.200"
  }
  
];



const tops2:any[]=[
  {
    top:1,
    cancion:"Gustavo Cerati",
    ingresos:"123.412"
    },
    {
      top:2,
      cancion:"Axel Rose",
      ingresos:"234.234"
    },
    {
      top:3,
      cancion:"Juanes",
      ingresos:"234.211"
  },
  {
    top:4,
    cancion:"Enrique Bumbury",
    ingresos:"234.565"
  },
  {
    top:5,
    cancion:"Shakira",
    ingresos:"2345"
  },
  {
    top:6,
    cancion:"La ley",
    ingresos:"122.32"
  },
  {
    top:7,
    cancion:"Kraken",
    ingresos:"124.433"
  },
  {
    top:8,
    cancion:"Akash",
    ingresos:"172.342"
  },
  {
    top:9,
    cancion:"Metallica",
    ingresos:"90.200"
  },
  {
    top:10,
    cancion:"Aterciopelados",
    ingresos:"234.342"
  }
];
