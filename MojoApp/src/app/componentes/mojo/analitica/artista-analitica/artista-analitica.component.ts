import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from '../../../../modelos/chart';

@Component({
  selector: 'app-artista',
  templateUrl: './artista-analitica.component.html',
  styleUrls: ['./artista-analitica.component.css']
})
export class ArtistaAnaliticaComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder) { }

  consultaForm:FormGroup;
  configChartPais:Chart;
  configLineYouTube:Chart;
  configLineSpotify:Chart;
  config:Chart;
  tops = tops;

  ngOnInit() {
    this.setVariables();
  }


  setVariables(){
    this.consultaForm = this._formBuilder.group({
      canal:[''],
      fechaInicio:[''],
      fechaFinal:['']
    });


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

    this.configLineYouTube = new Chart(
      "Vistas en YouTube",
      [
        ["Ene",  124],
        ["Feb",  345],
        ["Mar",  563],
        ["Abr",  234],
        ["May",  145],
        ["Jun",  215],
        ["Jul",  252],
        ["Ago",  265],
        ["Sep",  233],
        ["Oct", 183],
        ["Nov",  139],
        ["Dic",  96]
     ],
     ["Meses","YouTube"]
    );

    this.configLineSpotify = new Chart(
      "Vistas en Spotify",
      [
        ["Ene",  324],
        ["Feb",  545],
        ["Mar",  263],
        ["Abr",  134],
        ["May",  745],
        ["Jun",  415],
        ["Jul",  52],
        ["Ago",  265],
        ["Sep",  133],
        ["Oct", 283],
        ["Nov",  139],
        ["Dic",  96]
     ],
     ["Meses","Spotify"]
    );


    this.config = this.configLineYouTube;

  }

  onChange(event:any){
    this.config = (event.target.value == "Spotify")?this.configLineSpotify:this.configLineYouTube;
  }

}

const tops:any[]=[
  {
    top:1,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:2,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:3,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:4,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:5,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:6,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:7,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:8,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:9,
    cancion:"Tracks 1",
    ingresos:"234234"
  },
  {
    top:10,
    cancion:"Tracks 1",
    ingresos:"234234"
  }
  
];
