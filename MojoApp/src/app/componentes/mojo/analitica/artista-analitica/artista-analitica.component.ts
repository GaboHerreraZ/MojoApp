import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from '../../../../modelos/chart';
import { Integer } from 'aws-sdk/clients/apigateway';

@Component({
  selector: 'app-artista',
  templateUrl: './artista-analitica.component.html',
  styleUrls: ['./artista-analitica.component.css']
})
export class ArtistaAnaliticaComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  consultaForm: FormGroup;
  configChartPais: Chart;
  configLineYouTube: Chart;
  configLineSpotify: Chart;
  config: Chart;
  tops: any[];
  showSelect: Boolean;
  showInfo: Boolean;
  artistaSelected: String;
  arConfigChartPais: any[];
  arConfigLineYouTube: any[];
  arConfigLineSpotify: any[];
  arFollowers: any[];
  arStreams: any[];
  obStreams: any[];
  obFollowers: any[];
  arTops: any[];

  ngOnInit() {
    this.setInfo();
    //Vista
    this.showSelect = true;
    this.showInfo = false;
  }

  setInfo() {

    this.arConfigChartPais = [
      [
        ["Colombia", 1123],
        ["Argentina", 2623],
        ["Peru", 2556],
        ["Brasil", 233]
      ], [
        ["Colombia", 1234],
        ["Argentina", 2222],
        ["Peru", 253],
        ["Brasil", 2123]
      ], [
        ["Colombia", 124],
        ["Argentina", 2122],
        ["Peru", 300],
        ["Brasil", 899]
      ]
    ];

    //Youtube    
    this.arConfigLineYouTube = [[
      ["Ene", 124],
      ["Feb", 345],
      ["Mar", 563],
      ["Abr", 234],
      ["May", 145],
      ["Jun", 215],
      ["Jul", 252],
      ["Ago", 265],
      ["Sep", 233],
      ["Oct", 183],
      ["Nov", 139],
      ["Dic", 96]
    ], [
      ["Ene", 300],
      ["Feb", 324],
      ["Mar", 455],
      ["Abr", 567],
      ["May", 348],
      ["Jun", 215],
      ["Jul", 123],
      ["Ago", 345],
      ["Sep", 289],
      ["Oct", 456],
      ["Nov", 233],
      ["Dic", 100]
    ], [
      ["Ene", 333],
      ["Feb", 34],
      ["Mar", 80],
      ["Abr", 230],
      ["May", 405],
      ["Jun", 215],
      ["Jul", 569],
      ["Ago", 435],
      ["Sep", 233],
      ["Oct", 231],
      ["Nov", 139],
      ["Dic", 112]
    ]
    ];

    //Spotify
    this.arConfigLineSpotify = [
      [
        ["Ene", 324],
        ["Feb", 545],
        ["Mar", 263],
        ["Abr", 134],
        ["May", 745],
        ["Jun", 415],
        ["Jul", 52],
        ["Ago", 265],
        ["Sep", 133],
        ["Oct", 283],
        ["Nov", 139],
        ["Dic", 96]
      ], [
        ["Ene", 230],
        ["Feb", 456],
        ["Mar", 890],
        ["Abr", 134],
        ["May", 323],
        ["Jun", 768],
        ["Jul", 98],
        ["Ago", 152],
        ["Sep", 133],
        ["Oct", 283],
        ["Nov", 122],
        ["Dic", 98]
      ], [
        ["Ene", 324],
        ["Feb", 566],
        ["Mar", 263],
        ["Abr", 678],
        ["May", 123],
        ["Jun", 768],
        ["Jul", 45],
        ["Ago", 321],
        ["Sep", 133],
        ["Oct", 766],
        ["Nov", 564],
        ["Dic", 23]
      ]
    ];

    //Followers
    this.arFollowers = [
      [3233, 81929, 4552, 23828, 999, 20190, 54545],
      [12990, 1212, 3344, 7820, 989, 3232, 7499],
      [232323, 5636, 86890, 2121, 102929, 878, 2121]
    ]

    //Sreams
    this.arStreams = [
      [2323, 81929, 4552, 23828, 999, 102929, 54545],
      [12990, 9788, 3344, 7820, 989, 3232, 7499],
      [232323, 411, 86890, 7820, 3223, 878, 2121]
    ]

    //TOPS
    this.arTops = [[
      {
        top: 1,
        cancion: "Tracks 1",
        ingresos: "32323"
      },
      {
        top: 2,
        cancion: "Tracks 2",
        ingresos: "43443"
      },
      {
        top: 3,
        cancion: "Tracks 3",
        ingresos: "23728"
      },
      {
        top: 4,
        cancion: "Tracks 4",
        ingresos: "28392"
      },
      {
        top: 5,
        cancion: "Tracks 5",
        ingresos: "72838"
      },
      {
        top: 6,
        cancion: "Tracks 6",
        ingresos: "9823"
      },
      {
        top: 7,
        cancion: "Tracks 7",
        ingresos: "121212"
      },
      {
        top: 8,
        cancion: "Tracks 8",
        ingresos: "24424"
      },
      {
        top: 9,
        cancion: "Tracks 9",
        ingresos: "121232"
      },
      {
        top: 10,
        cancion: "Tracks 10",
        ingresos: "34222"
      }
    ], [
      {
        top: 1,
        cancion: "Tracks 1",
        ingresos: "52323"
      },
      {
        top: 2,
        cancion: "Tracks 2",
        ingresos: "9877"
      },
      {
        top: 3,
        cancion: "Tracks 3",
        ingresos: "4335"
      },
      {
        top: 4,
        cancion: "Tracks 4",
        ingresos: "87788"
      }
    ], [
      {
        top: 1,
        cancion: "Tracks 1",
        ingresos: "2222"
      },
      {
        top: 2,
        cancion: "Tracks 2",
        ingresos: "4111"
      },
      {
        top: 3,
        cancion: "Tracks 3",
        ingresos: "4554"
      },
      {
        top: 4,
        cancion: "Tracks 4",
        ingresos: "90999"
      },
      {
        top: 5,
        cancion: "Tracks 5",
        ingresos: "78999"
      },
      {
        top: 6,
        cancion: "Tracks 6",
        ingresos: "65420"
      }
    ]];
  }

  setVariables(nuIndex: Integer) {
    this.consultaForm = this._formBuilder.group({
      canal: [''],
      fechaInicio: [''],
      fechaFinal: ['']
    });

    this.configChartPais = new Chart(
      "",
      this.arConfigChartPais[nuIndex],
      ["País", "Ingresos"]
    );

    this.configLineYouTube = new Chart(
      "Vistas en YouTube",
      this.arConfigLineYouTube[nuIndex],
      ["Meses", "YouTube"]
    );

    this.configLineSpotify = new Chart(
      "Vistas en Spotify",
      this.arConfigLineSpotify[nuIndex],
      ["Meses", "Spotify"]
    );

    this.obStreams = this.arStreams[nuIndex];
    this.obFollowers = this.arFollowers[nuIndex];
    this.tops = this.arTops[nuIndex];
    this.config = this.configLineYouTube;

  }

  onChange(event: any) {
    this.config = (event.target.value == "Spotify") ? this.configLineSpotify : this.configLineYouTube;
  }

  onChangeArtista(event: any) {
    this.artistaSelected = event.target.value;
  }

  verAnaliticaArtista() {
    var me = this;

    switch (me.artistaSelected) {
      case "Mala Fama":
        me.setVariables(0);
        break;
      case "Los Rebeldes":
        me.setVariables(1);
        break;
      case "Rocio Quiroz":
        me.setVariables(2);
        break;
      default:
        me.setVariables(0);
        break;

    }
    me.showSelect = false;
    me.showInfo = true;
  }

  regresar() {
    this.showSelect = true;
    this.showInfo = false;
  }

}
