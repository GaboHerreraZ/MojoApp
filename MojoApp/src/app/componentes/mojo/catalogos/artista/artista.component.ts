import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Artista } from '../../../../modelos/ArtistaModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ComunesService } from '../../../../servicios/mojo/comunes/comunes.service';
import { Subject } from 'rxjs';
import { AccessArtistaService } from 'src/app/servicios/mojo/artista/access.artista.service';
import { AlertService } from '../../../../servicios/alert/alert.service';
import { Mensaje } from '../../../../utilidades/mensaje';
import { Title } from '@angular/platform-browser';
import { Constante } from '../../../../utilidades/constante';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject(); // necesario para el datatables

  artistas:any[];
  artistaSeleccionado: Artista;
  nuevoArtistaForm: FormGroup;
  editarArtistaForm: FormGroup;
  paises: any[];
  generos: any[];

  constructor(  private _fb: FormBuilder, 
                private _servicios: ComunesService,
                private _serviciosArtista:AccessArtistaService,
                private _message:AlertService,
                private _title:Title ) {

                  this._title.setTitle(Constante.tituloArtista);
                }



  ngOnInit() {

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
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
    };

    this.getPaises();
    this.getGeneros();
    this.getArtistas();

    this.artistas = [
      {
        artista:'Artista 1',
        afiliado:'Afiliado 1'
      },
      {
        artista:'Artista 1',
        afiliado:'Afiliado 1'
      },
      {
        artista:'Artista 1',
        afiliado:'Afiliado 1'
      },
      {
        artista:'Artista 1',
        afiliado:'Afiliado 1'
      },
      {
        artista:'Artista 1',
        afiliado:'Afiliado 1'
      },
      {
        artista:'Artista 1',
        afiliado:'Afiliado 1'
      },
      {
        artista:'Artista 1',
        afiliado:'Afiliado 1'
      }
    ];

  }


  public verDetalleArtista(artista: Artista) {
    this.artistaSeleccionado = artista;
    return;
  }

  public getArtistas(){
      this._serviciosArtista.getAccessArtistas();
      this._serviciosArtista.getArtistas().subscribe((res:any)=>{
        console.log("componente",res);
      },(error)=>{
          this._message.error(Mensaje.noBackEnd);
      });
  }

  public getPaises() {
    this._servicios.getPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  public getGeneros() {
    this._servicios.getGeneros().subscribe(generos => {
      this.generos = generos;
    });
  }

  public editarArtista(artista: Artista) {
    this.artistaSeleccionado = artista;

    this.editarArtistaForm = this._fb.group({
      pais: [this.artistaSeleccionado.pais, Validators.required],
      nombres: [this.artistaSeleccionado.nombres, Validators.required],
      apellidos: [this.artistaSeleccionado.apellidos, Validators.required],
      genero: [this.artistaSeleccionado.genero, Validators.required],
      facebook: [this.artistaSeleccionado.facebook],
      spotify: [this.artistaSeleccionado.spotify],
      instagram: [this.artistaSeleccionado.instagram],
      youtube: [this.artistaSeleccionado.youtube],
      id: [this.artistaSeleccionado.id]
    });

    return;
  }

  

  
}
