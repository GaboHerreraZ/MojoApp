import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Constante } from '../../../utilidades/constante';
import { Chart } from '../../../modelos/chart';
import { AccessComunesService } from '../../../servicios/mojo/comunes/access.comunes.service';
import { AlertService } from '../../../servicios/alert/alert.service';
import { Mensaje } from '../../../utilidades/mensaje';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccessArtistaService } from '../../../servicios/mojo/artista/access.artista.service';
import { double } from 'aws-sdk/clients/lightsail';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  constructor(private _title:Title,
              private _comunService:AccessComunesService,
              private _message:AlertService,
              private _formBuilder:FormBuilder,
              private _serviciosArtista:AccessArtistaService)
              {
        
                this._title.setTitle(Constante.tituloIngresos);
  }
  datos = datos;
  tops = tops;
  loading:boolean;
  canales:any[];
  artistas:any[];
  consultaForm:FormGroup;
  /*--Graficas--*/
  configChartPais:Chart;
  configChartCanal:Chart;
  configChartMes:Chart;
  totalIngresos:double=100;
  totalEgresos:double;
  totalSaldo:double;
  gananciaPeriodo:double;


  ngOnInit(){

    this.totalIngresos=100;
    this.setVariables();
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

  setVariables(){
    this.consultaForm = this._formBuilder.group({
      fechaInicio:[''],
      fechaFinal:[''],
      canal:[''],
      artista:['']
    });
    this.getCanales();
    this.getArtistas();

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


}


public EstadoCuenta(){
  this.loading= true;
  var me = this;
  me._comunService.getEstadoCuenta();
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
