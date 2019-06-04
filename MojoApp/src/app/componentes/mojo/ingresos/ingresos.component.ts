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
import { AccessIngresosService } from '../../../servicios/mojo/ingresos/access.ingresos.service';



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
              private _serviciosArtista:AccessArtistaService,
              private _serviciosAccounting:AccessIngresosService,
              )
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
        ["Chile", 193.252],
        ["Estados Unidos", 6.231],
        ["Argentina", 2.739],
        ["España", 1.902],
        ["Perú",	1.441],
        ["Australia", 1.249],       
        ["Otros", 7.81]
      ],
      ["País","Ingresos"]
    );
    
    this.configChartCanal = new Chart(
      "Ganancia por canal",
      [
        ["Youtube", 215.84],
        ["Deezer", 2]
      ],
      ["Canal","Ingresos"]
    );

    this.configChartMes = new Chart(
      "Ganancia por mes",
      [
        ["Enero", 0],
        ["Febrero", 0],
        ["Marzo", 215.84]
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
    this.estadoCuenta();
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
  
  
  public estadoCuenta(){
    this.loading= true;
    var me = this;

    console.log( me._serviciosAccounting.getEstadoCuenta());
    me._serviciosAccounting.getEstadoCuenta();
   /* me._comunService.getAccesCanales().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.canales = res.body.canales;
        me.loading = false;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });*/
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
    cancion:"Damelo",
    ingresos:"136.29"
  },
  {
    top:2,
    cancion:"Esto No Es una Canción de Amor",
    ingresos:"21.755"
  },
  {
    top:3,
    cancion:"Amor Platonico",
    ingresos:"8.893"
  },
  {
    top:4,
    cancion:"Andrómeda",
    ingresos:"5.964"
  },
  {
    top:5,
    cancion:"Eres Tan Distinta",
    ingresos:"5.838"
  },
  {
    top:6,
    cancion:"Vibe",
    ingresos:"2.875"
  },
  {
    top:7,
    cancion:"Plop", 
    ingresos:"2.042"
  },
  {
    top:8,
    cancion:"Luces Rojas",
    ingresos:"1.455"
  },
  {
    top:9,
    cancion:"Calma",
    ingresos:"1.339"
  },
  {
    top:10,
    cancion:"Cuál es el secreto - El Búho Remix",
    ingresos:" 1.185"
  }
  

];
