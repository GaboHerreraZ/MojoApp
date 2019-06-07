import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from '../../../../modelos/chart';
import { Integer } from 'aws-sdk/clients/apigateway';
import { Constante } from '../../../../utilidades/constante';
import { Mensaje } from '../../../../utilidades/mensaje';
import { AccessComunesService } from '../../../../servicios/mojo/comunes/access.comunes.service';
import { AlertService } from '../../../../servicios/alert/alert.service';
import { AccessArtistaAnaliticaService } from '../../../../servicios/mojo/analitica/artista-analitica/access.artista-analitica.service';
import { debug } from 'util';

@Component({
  selector: 'app-artista',
  templateUrl: './artista-analitica.component.html',
  styleUrls: ['./artista-analitica.component.css']
})
export class ArtistaAnaliticaComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private _comunService: AccessComunesService,
    private _message: AlertService,
    private _serviciosArtistasAnalitycs: AccessArtistaAnaliticaService) { }

  consultaForm: FormGroup;
  loading: boolean;
  configChartPais: Chart;
  configLineYouTube: Chart;
  configLineSpotify: Chart;
  config: Chart;
  tops: any[];
  arFollowers: any[];

  //Temporales por simulacion
  arStreams: any[];
  obStreams: any[];
  arFollowersTemp: any[];
  arConfigLineYouTube: any[];
  arConfigLineSpotify: any[];
  showSelect: Boolean;
  showInfo: Boolean;
  artistaSelected: String = "El Pepo";
  arConfigChartPais: any[];
  arTops: any[];

  ngOnInit() {
    var me = this;
    me.inicializarVariables();

    //Carga Info temporal para simulación
    this.setInfo();

    //Carga la información inicial del artista
    me.CargarInformacion();
  }

  inicializarVariables() {
    this.consultaForm = this._formBuilder.group({
      canal: ['7'],
      fechaInicio: [''],
      fechaFinal: ['']
    });

    //Control de la vista
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
      ]
    ];

    //Youtube    
    this.arConfigLineYouTube = [[
      ["2019-05-03", 252],
      ["2019-05-04", 124],
      ["2019-05-05", 345],
      ["2019-05-06", 563],
      ["2019-05-07", 234],
      ["2019-05-08", 145],
      ["2019-05-09", 215],
      ["2019-05-10", 285]
    ], [
      ["2019-05-04", 300],
      ["2019-05-05", 324],
      ["2019-05-06", 455],
      ["2019-05-07", 567],
      ["2019-05-08", 348],
      ["2019-05-09", 215],
      ["2019-05-10", 123]
    ]
    ];

    //Spotify
    this.arConfigLineSpotify = [
      [
        ["2019-05-03", 950],
        ["2019-05-04", 233],
        ["2019-05-05", 123],
        ["2019-05-06", 494],
        ["2019-05-07", 98],
        ["2019-05-08", 122],
        ["2019-05-09", 94],
        ["2019-05-10", 121]
      ], [
        ["2019-05-04", 982],
        ["2019-05-05", 973],
        ["2019-05-06", 423],
        ["2019-05-07", 567],
        ["2019-05-08", 838],
        ["2019-05-09", 111],
        ["2019-05-10", 96]
      ]
    ];

    //Followers
    this.arFollowersTemp = [
      [{ "followers": 3233 }, { "followers": 81929 }, { "followers": 4552 }, { "followers": 23828 }, { "followers": 999 }, { "followers": 20190 }, { "followers": 54545 }],
      [{ "followers": 12990 }, { "followers": 1212 }, { "followers": 3344 }, { "followers": 7820 }, { "followers": 989 }, { "followers": 3232 }, { "followers": 7499 }]
    ]

    //Sreams
    this.arStreams = [
      [2323, 81929, 4552, 23828, 999, 102929, 54545],
      [1213, 81929, 4552, 23828, 999, 102929, 54545],
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
      },
      {
        top: 5,
        cancion: "Tracks 5",
        ingresos: "2222"
      },
      {
        top: 6,
        cancion: "Tracks 6",
        ingresos: "4111"
      },
      {
        top: 7,
        cancion: "Tracks 7",
        ingresos: "4554"
      },
      {
        top: 8,
        cancion: "Tracks 8",
        ingresos: "90999"
      },
      {
        top: 9,
        cancion: "Tracks 9",
        ingresos: "78999"
      },
      {
        top: 10,
        cancion: "Tracks 10",
        ingresos: "65420"
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
      },
      {
        top: 5,
        cancion: "Tracks 5",
        ingresos: "2222"
      },
      {
        top: 6,
        cancion: "Tracks 6",
        ingresos: "4111"
      },
      {
        top: 7,
        cancion: "Tracks 7",
        ingresos: "4554"
      },
      {
        top: 8,
        cancion: "Tracks 8",
        ingresos: "90999"
      },
      {
        top: 9,
        cancion: "Tracks 9",
        ingresos: "78999"
      },
      {
        top: 10,
        cancion: "Tracks 10",
        ingresos: "65420"
      }
    ]];
  }

  setVariables(nuIndex: Integer) {
    this.configChartPais = new Chart(
      "",
      this.arConfigChartPais[nuIndex],
      ["País", "Ingresos"],
      null
    );

    this.configLineYouTube = new Chart(
      "Vistas en YouTube",
      this.arConfigLineYouTube[nuIndex],
      ["Meses", "YouTube"],
      null
    );

    this.configLineSpotify = new Chart(
      "Vistas en Spotify",
      this.arConfigLineSpotify[nuIndex],
      ["Meses", "Spotify"],
      null
    );

    this.obStreams = this.arStreams[nuIndex];
    this.arFollowers = this.arFollowersTemp[nuIndex];
    this.tops = this.arTops[nuIndex];
    this.config = this.configLineYouTube;
  }

  //Método temporal para simulación de datos
  onChangeArtista(event: any) {
    this.artistaSelected = event.target.value;
  }

  //Método temporal para simulación de datos
  verAnaliticaArtista() {
    var me = this;
    switch (me.artistaSelected) {
      case "El Pepo":
        me.setVariables(2);
        break;
      case "Los Rebeldes":
        me.setVariables(0);
        break;
      case "Rocio Quiroz":
        me.setVariables(1);
        break;
      default:
        me.setVariables(2);
        break;

    }
    me.showSelect = false;
    me.showInfo = true;
  }

  /**
   * Method: CargarInformacion
   * ----------------------------------------------------
   * Método que obtiene toda la información inicial de 
   * analitycs por artista: seguidores, reproducciones, oyentes.
   */
  CargarInformacion() {
    var me = this;
    me.loading = true;

    //Obtiene seguidores
    me.getSeguidores();

    //Obtiene oyentes por canal (Por defecto Youtube)
    me.getOyentesCanal(Constante.Youtube);

    //Obtiene oyentes por país y canal (Por defecto Youtube)
    me.getOyentesPaisCanal(Constante.Youtube);
  }

  /**
   * Method: getSeguidores
   * ----------------------------------------------------
   * Obtiene la información de seguidores por canal
   */
  getSeguidores() {
    var me = this,
      obParams = {
        "fecha": "2019-05-30",
        "artistaId": 13
      };
    me._serviciosArtistasAnalitycs.getAccessSeguidores(obParams);
    me._serviciosArtistasAnalitycs.getSeguidores().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.arFollowersTemp[2] = res.body.res[0];
        //me.arFollowers = res.body.res[0];
        me.loading = false;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

  /**
   * Method: getOyentesCanal
   * ----------------------------------------------------
   * Obtiene la información de oyentes por canal
   * 
   * @param  {Integer}  nuCanal Identificador del canal
   */
  getOyentesCanal(nuCanal: Integer) {
    var me = this,
      obParams = {
        "periodoInicial=": "2019-04-04",
        "periodoFinal": "2019-04-09",
        "canalId": nuCanal,
        "artistaId": 13
      };
    me._serviciosArtistasAnalitycs.getAccessOyentes(obParams);
    me._serviciosArtistasAnalitycs.getOyentes().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.configLineChart(res.body.res[0], nuCanal);
        me.loading = false;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

  /**
   * Method: getOyentesPaisCanal
   * ----------------------------------------------------
   * Obtiene la información de oyentes por países de un
   * canal.
   * @param  {Integer}  nuCanal Identificador del canal
   */
  getOyentesPaisCanal(nuCanal: Integer) {
    var me = this,
      obParams = {
        "fecha": "2019-05-30",
        "canalId": nuCanal,
        "artistaId": 13
      };
    me._serviciosArtistasAnalitycs.getAccessOyentesPais(obParams);
    me._serviciosArtistasAnalitycs.getOyentesPais().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.configPieChart(res.body.res[0], nuCanal);
        me.loading = false;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

  /**
   * Method: configLineChart
   * ----------------------------------------------------
   * Organiza la data de acuerdo a los parámetros de
   * la gráfica tipo Lineal.
   * 
   * @param  {any}      arOyentesData Información de oyentes
   * @param  {Integer}  nuCanal Identificador del canal
   */
  configLineChart(arOyentesData: any[], nuCanal: Integer) {
    var me = this,
      arData = [],
      nuLength = arOyentesData.length,
      nuIndex = 0,
      obOyentesData = null;

    for (nuIndex; nuIndex < nuLength; nuIndex++) {
      obOyentesData = arOyentesData[nuIndex];
      arData[nuIndex] = [obOyentesData.fecha.substr(0, 10), obOyentesData.cantOyentes];
    }

    if (nuCanal == Constante.Spotify) {
      me.arConfigLineSpotify[2] = arData;
      me.config = new Chart(
        "Vistas en Spotify",
        me.arConfigLineSpotify[2],
        ["Meses", "Spotify"],
        null
      );
    } else {
      me.arConfigLineYouTube[2] = arData;
      me.config = new Chart(
        "Vistas en YouTube",
        me.arConfigLineYouTube[2],
        ["Meses", "YouTube"],
        null
      );
    }

  }

  /**
   * Method: configPieChart
   * ----------------------------------------------------
   * Organiza la data de acuerdo a los parámetros de
   * la gráfica tipo torta.
   * 
   * @param  {any}      arOyentesData Información de oyentes
   * @param  {Integer}  nuCanal Identificador del canal   
   */
  configPieChart(arOyentesData: any[], nuCanal: Integer) {
    var me = this,
      arData = [],
      nuLength = arOyentesData.length,
      nuIndex = 0,
      obOyentesData = null;

    for (nuIndex; nuIndex < nuLength; nuIndex++) {
      obOyentesData = arOyentesData[nuIndex];
      arData[nuIndex] = [obOyentesData.pais, obOyentesData.oyentes];
    }

    me.arConfigChartPais[2] = arData;
    me.configChartPais = new Chart(
      "",
      me.arConfigChartPais[2],
      ["País", "Ingresos"],
      null
    );
  }

  /**
   * Method: consultarInformacion
   * ----------------------------------------------------
   * Consulta información del artista a partir de los 
   * filtros seleccionados.
   * 
   */
  consultarInformacion() {
    var me = this,
      obParamsQuery = me.consultaForm.value;

    if (me.artistaSelected == "El Pepo") {
      me.getOyentesCanal(obParamsQuery.canal);
      me.getOyentesPaisCanal(obParamsQuery.canal);
    } else {
      me.config = (obParamsQuery.canal == Constante.Spotify) ? me.configLineSpotify : me.configLineYouTube;
    }
  }

  regresar() {
    var me = this;
    me.inicializarVariables();
    me.artistaSelected = "El Pepo";
  }
}
