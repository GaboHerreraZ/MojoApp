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

  artistas:any;
  artistaSeleccionado: Artista;
  nuevoArtistaForm: FormGroup;
  editarArtistaForm: FormGroup;
  paises: any[];
  generos: any[];

  constructor(  private _fb: FormBuilder, 
                private _serviciosArtista:AccessArtistaService,
                private _message:AlertService,
                private _title:Title ) {

                  this._title.setTitle(Constante.tituloArtista);
                }



  ngOnInit() {

    this.getArtistas();
    this.getArtistasAfiliado();
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

    this.artistas = {
      "data": [
        {
          "id": 1,
          "nombres": "Azul Carrizo",
          "idSpotify": null,
          "instagram": null,
          "facebook": null,
          "label": null,
          "canalYoutube": null,
          "afiliados": [
            {
              "id": 15,
              "nombres": "Gabriel Giqueaux",
              "posicion": "Ceo",
              "afiliado": "Procom S.r.l",
              "telefono": "15-5428-5584 ",
              "paisId": null
            }
          ],
          "pais": {
            "id": 13,
            "iso": "AR",
            "nombre": "Argentina"
          }
        },
        {
          "id": 4,
          "nombres": "Mala Fama",
          "idSpotify": null,
          "instagram": null,
          "facebook": null,
          "label": null,
          "canalYoutube": null,
          "afiliados": [
            {
              "id": 1,
              "nombres": "Adrian Serantoni",
              "posicion": "Dueño",
              "afiliado": "Ser Tv",
              "telefono": "14515122",
              "paisId": null
            },
            {
              "id": 15,
              "nombres": "Gabriel Giqueaux",
              "posicion": "Ceo",
              "afiliado": "Procom S.r.l",
              "telefono": "15-5428-5584 ",
              "paisId": null
            },
            {
              "id": 29,
              "nombres": "Hernan Luis Coronel",
              "posicion": "Ceo",
              "afiliado": "Mala Fama",
              "telefono": "1532643176",
              "paisId": null
            },
            {
              "id": 32,
              "nombres": "Reynaldo Lio",
              "posicion": "Ceo",
              "afiliado": "Rey Producciones",
              "telefono": "",
              "paisId": null
            }
          ],
          "pais": {
            "id": 13,
            "iso": "AR",
            "nombre": "Argentina"
          }
        }
      ]
      };

  }

  public getArtistas(){
    this._serviciosArtista.getAccessArtistas();
    this._serviciosArtista.getArtistas().subscribe((res:any)=>{
      if(res.status = Constante.ok){
        console.log("Artistas afiliados",res.body)
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
      console.log("Artistas afiliado",res)
      if(res.status = Constante.ok){
        console.log("Artistas afiliado",res.body)
      }else{
        console.log("error");
        this._message.error(res);
      }
    },error=>{
      this._message.error(Mensaje.noBackEnd);
    });
  }
  
  
}
