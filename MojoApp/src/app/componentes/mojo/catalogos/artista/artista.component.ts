import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Artista } from '../../../../modelos/ArtistaModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AccessArtistaService } from 'src/app/servicios/mojo/artista/access.artista.service';
import { AlertService } from '../../../../servicios/alert/alert.service';
import { Mensaje } from '../../../../utilidades/mensaje';
import { Title } from '@angular/platform-browser';
import { Constante } from '../../../../utilidades/constante';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArtistaComponent implements OnInit {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject(); // necesario para el datatables

  artistas:any[]=[];
  nuevoArtistaForm: FormGroup;
  show:boolean = false;
  loading:boolean = true;
  text:string = "";
  constructor(  private _fb: FormBuilder, 
                private _serviciosArtista:AccessArtistaService,
                private _message:AlertService,
                private _title:Title ) {

                  this._title.setTitle(Constante.tituloArtista);
                  this.setVariables();
                }



  ngOnInit() {
    this.getArtistas();
  }

  public getArtistas(){
    this._serviciosArtista.getAccessArtistas();
    this._serviciosArtista.getArtistas().subscribe((res:any)=>{
      if(res.status = Constante.ok){
        this.artistas = res.body.data;
        this.show = true;
        this.loading = false;
      }else{
        this._message.error(res);
      }
    },error=>{
      this._message.error(Mensaje.noBackEnd);
    });
  }


  public getArtistasAfiliado(){
    this._serviciosArtista.getAccessArtistasAfiliado();
    this._serviciosArtista.getArtistasAfiliado().subscribe((res:any)=>{
      if(res.status = Constante.ok){
      }else{
        this._message.error(res);
      }
    },error=>{
      this._message.error(Mensaje.noBackEnd);
    });
  }
  
 
  setVariables(){
    this.nuevoArtistaForm = this._fb.group({
      pais: ["", Validators.required],
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      genero: ["", Validators.required],
      facebook: [""],
      spotify: [""],
      instagram: [""],
      youtube: [""]
    });
  }
  


}
