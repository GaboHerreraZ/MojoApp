import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

import { Title } from '@angular/platform-browser';
import { Constante } from '../../../utilidades/constante';
import { Chart } from '../../../modelos/chart';
import { AccessComunesService } from '../../../servicios/mojo/comunes/access.comunes.service';
import { AlertService } from '../../../servicios/alert/alert.service';
import { Mensaje } from '../../../utilidades/mensaje';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessArtistaService } from '../../../servicios/mojo/artista/access.artista.service';
import { double } from 'aws-sdk/clients/lightsail';
import { AccessIngresosService } from 'src/app/servicios/mojo/ingresos/access.ingresos.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  paises = null;
  show = false;
  removable = true;
  filters =[
    {id:1,filter:"Artista:el pepo"},
    {id:2,filter:"Artista:el pepudo"},
    {id:3,filter:"Artista:el pepito"}

  ];
  cities = [
    {id: 1, name: 'Sur america'},
    {id: 2, name: 'Europa'},
];

  constructor(){

  }

  onChange(event:any){
    this.show = true;
    if(event == undefined){
      return;
    }

    if(event.name == "Sur america"){
      this.paises  = [
        {id: 1, name: 'Colombia'},
        {id: 2, name: 'Peru'},
        {id: 3, name: 'Argentina'},
        {id: 4, name: 'Brasil'},
        {id: 5, name: 'Bolivia'}
      ]
    }else{
      this.paises = [
        {id: 1, name: 'España'},
        {id: 2, name: 'Italia'},
        {id: 3, name: 'Alemania'}
      ]

    }
  }

  remove(filter){
    const index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

  ngOnInit(){
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,
      dateInputFormat: 'MM/YYYY'
    });
  }



  /*
  constructor(private _title: Title,
    private _comunService: AccessComunesService,
    private _message: AlertService,
    private _formBuilder: FormBuilder,
    private _serviciosArtista: AccessArtistaService,
    private _serviciosIngresos: AccessIngresosService) {

    this._title.setTitle(Constante.tituloIngresos);
  }
  
  datos: any[];
  tops = tops1;
  loading: boolean;
  canales: any[];
  artistas: any[];
  consultaForm: FormGroup;
  configChartPais: Chart;
  configChartCanal: Chart;
  configChartMes: Chart;
  totalIngresos: double;
  totalEgresos: double;
  totalSaldo: double;
  gananciaPeriodo: double;

  //Ver detalle de ingresos
  showDetail: boolean;
  ingresoPeriodoData: any[];

  ngOnInit() {
    this.showDetail = false;
    this.setVariables();
    this.configChartPais = new Chart(
      "Ganancia por pais",
      [
        ["Chile", 193.252],
        ["Estados Unidos", 6.231],
        ["Argentina", 2.739],
        ["España", 1.902],
        ["Perú", 1.441],
        ["Australia", 1.249],
        ["Otros", 7.81]
      ],
      ["País", "Ingresos"],
      null
    );

    this.configChartCanal = new Chart(
      "Ganancia por canal",
      [
        ["Youtube", 215.84],
        ["Deezer", 2]
      ],
      ["Canal", "Ingresos"],
      null
    );

    this.configChartMes = new Chart(
      "Ganancia por mes",
      [
        ["Enero", 0],
        ["Febrero", 0],
        ["Marzo", 215.84]
      ],
      ["Mes", "Ingresos"],
      null
    );

  }

  setVariables() {
    this.consultaForm = this._formBuilder.group({
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      canal: ['', Validators.required],
      artista: ['', Validators.required]
    });
    this.getCanales();
    this.getArtistas();
    this.getEstadoCuenta();
    this.getIngresosPorPeriodo();
  }

  public getCanales() {
    this.loading = true;
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
  }

  public getEstadoCuenta() {
    var me = this,
      objEstadoCuenta = {
        "IngresosTotal": null,
        "EsgresosTotal": null,
        "SaldoACuenta": null,
        "IngresosPeriodo": null
      };
    me._serviciosIngresos.getAccessEstadoCuenta();
    me._serviciosIngresos.getEstadoCuenta().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        objEstadoCuenta = JSON.parse(res.body.result)[0];
        me.totalIngresos = objEstadoCuenta.IngresosTotal.toFixed(2);
        me.totalEgresos = objEstadoCuenta.EsgresosTotal.toFixed(2);
        me.totalSaldo = objEstadoCuenta.SaldoACuenta.toFixed(2);
        me.gananciaPeriodo = objEstadoCuenta.IngresosPeriodo == null ? 0.00 : objEstadoCuenta.IngresosPeriodo.toFixed(2);
        me.loading = false;

      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

  public getIngresosPorPeriodo() {
    var me = this;
    me._serviciosIngresos.getAccessIngresosPeriodo();
    me._serviciosIngresos.getIngresosPeriodo().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.datos = JSON.parse(res.body.result);
        me.loading = false;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

 * Method: verDetallePeriodo
 * ----------------------------------------------------
 * Asigna la información del ingreso por periodo a mostrar y despliega
 * la vista del detalle.
 * 
 * @param  {} obIngreso Información del ingreso por periodo seleccionado
 
  verDetallePeriodo(obIngreso: any) {
    var me = this;
    console.log(obIngreso);
    me._serviciosIngresos.getAccessDetalleIngresos(obIngreso);
    me._serviciosIngresos.getDetalleIngresosPeriodo().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        this.ingresoPeriodoData = JSON.parse(res.body.result);
        me.loading = false;
        me.showDetail = true;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

  regresar() {
    this.showDetail = false;
  }

  consultar() {
    switch (this.tops) {
      case tops1: {
        this.tops = tops2;
        this.configChartPais = new Chart(
          "Ganancia por pais",
          [
            ["Chile", 193.252],
            ["Estados Unidos", 6.231],
            ["Argentina", 2.739],
            ["España", 1.902],
            ["Perú", 1.441],
            ["Australia", 1.249],
            ["Otros", 7.81]
          ],
          ["País", "Ingresos"],
          null
        );

        this.configChartCanal = new Chart(
          "Ganancia por canal",
          [
            ["Youtube", 215.84],
            ["Deezer", 2]
          ],
          ["Canal", "Ingresos"],
          null
        );

        this.configChartMes = new Chart(
          "Ganancia por mes",
          [
            ["Enero", 0],
            ["Febrero", 0],
            ["Marzo", 215.84]
          ],
          ["Mes", "Ingresos"],
          null
        );

        break;
      }
      case tops2: {
        this.tops = tops1;
        this.configChartPais = new Chart(
          "Ganancia por pais",
          [
            ["Chile", 12.252],
            ["Estados Unidos", 45.231],
            ["Argentina", 25.739],
            ["España", 18.902],
            ["Perú", 23.441],
            ["Australia", 17.249],
            ["Otros", 19.81]
          ],
          ["País", "Ingresos"],
          null
        );

        this.configChartCanal = new Chart(
          "Ganancia por canal",
          [
            ["Youtube", 128.84],
            ["Deezer", 282.73]
          ],
          ["Canal", "Ingresos"],
          null
        );

        this.configChartMes = new Chart(
          "Ganancia por mes",
          [
            ["Enero", 123], 
            ["Febrero", 341],
            ["Marzo", 215.84]
          ],
          ["Mes", "Ingresos"],
          null
        );
        break;
      }

    }
  }
 */
}

/* 

const tops1: any[] = [
  {
    top: 1,
    cancion: "Damelo",
    ingresos: "136.29"
  },
  {
    top: 2,
    cancion: "Esto No Es una Canción de Amor",
    ingresos: "21.755"
  },
  {
    top: 3,
    cancion: "Amor Platonico",
    ingresos: "8.893"
  },
  {
    top: 4,
    cancion: "Andrómeda",
    ingresos: "5.964"
  },
  {
    top: 5,
    cancion: "Eres Tan Distinta",
    ingresos: "5.838"
  },
  {
    top: 6,
    cancion: "Vibe",
    ingresos: "2.875"
  },
  {
    top: 7,
    cancion: "Plop",
    ingresos: "2.042"
  },
  {
    top: 8,
    cancion: "Luces Rojas",
    ingresos: "1.455"
  },
  {
    top: 9,
    cancion: "Calma",
    ingresos: "1.339"
  },
  {
    top: 10,
    cancion: "Cuál es el secreto - El Búho Remix",
    ingresos: " 1.185"
  }

];

const tops2: any[] = [
  {
    top: 1,
    cancion: "Damelo",
    ingresos: "136.29"
  },
  {
    top: 2,
    cancion: "Amor Platonico",
    ingresos: "8.893"
  },
  {
    top: 3,
    cancion: "Esto No Es una Canción de Amor",
    ingresos: "21.755"
  },
  {
    top: 4,
    cancion: "Andrómeda",
    ingresos: "5.964"
  },
  {
    top: 5,
    cancion: "Vibe",
    ingresos: "2.875"

  },
  {
    top: 6,
    cancion: "Eres Tan Distinta",
    ingresos: "5.838"
  },
  {
    top: 7,
    cancion: "Luces Rojas",
    ingresos: "1.455"
  },
  {
    top: 8,
    cancion: "Plop",
    ingresos: "2.042"
  },
  {
    top: 9,
    cancion: "Cuál es el secreto - El Búho Remix",
    ingresos: " 1.185"
  },
  {
    top: 10,
    cancion: "Calma",
    ingresos: "1.339"
  }

];

*/