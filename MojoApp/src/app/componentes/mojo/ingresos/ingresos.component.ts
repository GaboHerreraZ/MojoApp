import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import * as CanvasJS from '../../../../assets/js/analytics.js';
import { AccessComunesService } from '../../../servicios/mojo/comunes/access.comunes.service';
import { Constante } from '../../../utilidades/constante';
import { AlertService } from '../../../servicios/alert/alert.service';
import { Mensaje } from '../../../utilidades/mensaje';
import { AccessArtistaService } from '../../../servicios/mojo/artista/access.artista.service';


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;
  show = false;
  primerFiltro:any;
  segundoFiltro:any;
  label:string;
  removable = true;
  objeto:any;
  loading:boolean;

  filters:any[] =[];

  filtro = [
    {id: 'sello', nombre: 'Sello'},
    {id: 'album', nombre: 'Album'},
    {id: 'artista', nombre: 'Artista'},
    {id: 'track', nombre: 'Track'},
    {id: 'servicio', nombre: 'Servicio'},
    {id: 'pais', nombre: 'País'},
    {id: 'periodo', nombre: 'Periodo'}

];

  constructor(private _comunService:AccessComunesService,
              private _artistaService:AccessArtistaService,
              private _message:AlertService){

  }

  onChange(event:any){
    this.show = false;
    this.primerFiltro = event;
    if(event == undefined){
      return;
    }
    if(event.nombre == "País"){
      this.label = "nombre";
      this._comunService.getAccessPaises();
      this._comunService.getPaises().subscribe((res:any)=>{
        if (res.status = Constante.ok) {
          this.objeto = res.body.res;
          this.loading = false;
          this.show = true;
        } else {
          this._message.error(res);
        }
      },error =>{
        this._message.error(Mensaje.noBackEnd);
      });

    }

    if(event.nombre == "Servicio"){
      this.label = "nombre";
      this._comunService.getCanales();
      this._comunService.getAccesCanales().subscribe((res:any)=>{
        if (res.status = Constante.ok) {
          this.objeto = res.body.canales;
          this.loading = false;
          this.show = true;
        } else {
          this._message.error(res);
        }
      },error =>{
        this._message.error(Mensaje.noBackEnd);
      });
    }

    if(event.nombre == "Artista"){
      this.label = "nombres";
      this._artistaService.getAccessArtistas();
      this._artistaService.getArtistas().subscribe((res:any)=>{
        if (res.status = Constante.ok) {
          this.objeto = res.body.result.data;
          this.loading = false;
          this.show = true;
        } else {
          this._message.error(res);
        }
      },error =>{
        this._message.error(Mensaje.noBackEnd);
      });
    }
  }


  onChangePor(event:any){
    this.segundoFiltro = event;
    let filtro:any;
    if(this.primerFiltro.id == "pais" || this.primerFiltro.id == "servicio" ) {
       filtro = {
        tipo:this.primerFiltro.id,
        valor:this.segundoFiltro.nombre
       }
    }

    if(this.primerFiltro.id == "artista"){
      filtro = {
        tipo:this.primerFiltro.id,
        valor:this.segundoFiltro.nombres
       }
    }
    this.filters.push(filtro);
      /*Llamar servicio */

  }

  remove(filter){
    const index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }

    /*Llamar servicio */

  }

  

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode,
      dateInputFormat: 'MM/YYYY'
    });

    /*let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Monthly Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Food" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Traveling" },
          { y: 800, name: "Housing" },
          { y: 150, name: "Education" },
          { y: 150, name: "Shopping"},
          { y: 250, name: "Others" }
        ]
      }]
    });
      
    chart.render();*/

  }

}