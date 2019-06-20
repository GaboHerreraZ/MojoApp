import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import * as CanvasJS from '../../../../assets/js/analytics.js';
import { AccessComunesService } from '../../../servicios/mojo/comunes/access.comunes.service';
import { Constante } from '../../../utilidades/constante';
import { AlertService } from '../../../servicios/alert/alert.service';
import { Mensaje } from '../../../utilidades/mensaje';
import { AccessArtistaService } from '../../../servicios/mojo/artista/access.artista.service';
import { DatatableComponent } from '../../../elementos/datatable/datatable.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  @ViewChild(DatatableComponent) dataTable: DatatableComponent;

  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  show = false;
  primerFiltro: any;
  segundoFiltro: any;
  label: string;
  removable = true;
  objeto: any;
  loading: boolean;

  filters: any[] = [];

  filtro = [
    { id: 'sello', nombre: 'Sello' },
    { id: 'album', nombre: 'Album' },
    { id: 'artista', nombre: 'Artista' },
    { id: 'track', nombre: 'Track' },
    { id: 'servicio', nombre: 'Servicio' },
    { id: 'pais', nombre: 'País' },
    { id: 'periodo', nombre: 'Periodo' }
  ];

  //Variables Autocomplete server ejemplo  
  seleccionPais: FormGroup;
  paisesFiltrados: any[] = [];
  isLoading = false;

  seleccionPais2:FormGroup;
  paisesFiltrados2: any[] = [];  
  isLoading2 = false;

  /*Config data tables */
  configLabes:any;
  configArtista:any;
  configAlbum:any;
  configTrack:any;
  configTienda:any;
  configPais:any;
  configPeriodo:any;

  constructor(private _comunService: AccessComunesService,
    private _artistaService: AccessArtistaService,
    private _message: AlertService,
    private _http: HttpClient,
    private _fb: FormBuilder) {

  }

  onChange(event: any) {
    this.show = false;
    this.primerFiltro = event;
    if (event == undefined) {
      return;
    }
    if (event.nombre == "País") {
      this.label = "nombre";
      this.show = true;
     /* this._comunService.getAccessPaises();
      this._comunService.getPaises().subscribe((res: any) => {
        if (res.status = Constante.ok) {
          this.objeto = res.body.res;
          this.loading = false;
          this.show = true;
        } else {
          this._message.error(res);
        }
      }, error => {
        this._message.error(Mensaje.noBackEnd);
      });
    }*/}

    if (event.nombre == "Servicio") {
      this.label = "nombre";
      this._comunService.getCanales();
      this._comunService.getAccesCanales().subscribe((res: any) => {
        if (res.status = Constante.ok) {
          this.objeto = res.body.canales;
          this.loading = false;
          this.show = true;
        } else {
          this._message.error(res);
        }
      }, error => {
        this._message.error(Mensaje.noBackEnd);
      });
    }

    if (event.nombre == "Artista") {
      this.label = "nombres";
      this._artistaService.getAccessArtistas();
      this._artistaService.getArtistas().subscribe((res: any) => {
        if (res.status = Constante.ok) {
          this.objeto = res.body.result.data;
          this.loading = false;
          this.show = true;
        } else {
          this._message.error(res);
        }
      }, error => {
        this._message.error(Mensaje.noBackEnd);
      });
    }
  }


  onChangePor(event: any) {
    this.segundoFiltro = event;
    let filtro: any;
    if (this.primerFiltro.id == "pais" || this.primerFiltro.id == "servicio") {
      filtro = {
        tipo: this.primerFiltro.id,
        valor: this.segundoFiltro.nombre
      }
    }

    if (this.primerFiltro.id == "artista") {
      filtro = {
        tipo: this.primerFiltro.id,
        valor: this.segundoFiltro.nombres
      }
    }
    this.filters.push(filtro);
    /*Llamar servicio */

  }

  remove(filter) {
    const index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }

    /*Llamar servicio */

  }



  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      dateInputFormat: 'MM/YYYY'
    });

    this.seleccionPais = this._fb.group({
      paisId: [""]
    });

    this.loadingPaises();
    this.configDataTable();

  }

  regresar() {
    this.dataTable.showData();
    console.log(localStorage.getItem('register'));
  }

    loadingPaises() {
    this.seleccionPais.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.paisesFiltrados2 = [];
          this.isLoading2 = true;
        }),
        switchMap(value => this._http.get("https://gpqgrg848i.execute-api.us-east-1.amazonaws.com/dev/paises?pais=" + value.paisId)
          .pipe(
            finalize(() => {
              this.isLoading2 = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data['res'] == undefined) {
          this.paisesFiltrados2 = [];
        } else {
          this.paisesFiltrados2 = data['res'];
        }
        console.log("Países autocomplete angular material:",this.paisesFiltrados2);
      });
  }

  configDataTable(){
    
    this.configLabes ={
      column:["Sello","Ingresos","Total"],
      columnType:["text","text","currency"],
      data:[],
      buttons:[],
      filter: true
    };

    this.configArtista ={
      column:["Artista","Ingresos","Total"],
      columnType:["text","text","currency"],
      data:[],
      buttons:[],
      filter: true
    };

    this.configAlbum ={
      column:["Albums","Artista","UPC","Ingresos","Total"],
      columnType:["text","text","text","currency","currency"],
      data:[],
      buttons:[],
      filter: true
    };

    this.configTrack ={
      column:["Track","Artista","UPC","Ingresos","Total"],
      columnType:["text","text","text","currency","Currency"],
      data:[],
      buttons:[],
      filter: true
    };

    this.configTienda ={
      column:["Tienda","Total"],
      columnType:["text","currency"],
      data:[],
      buttons:[],
      filter: true
    };

    
    this.configPais ={
      column:["País","Total"],
      columnType:["text","currency"],
      data:[],
      buttons:[],
      filter: true
    };

    this.configPeriodo ={
      column:["Periodo","Total"],
      columnType:["text","currency"],
      data:[],
      buttons:[],
      filter: true
    };


  }





}