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
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArtistaComponent implements OnInit {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject(); // necesario para el datatables

  artistas: any[] = [];
  nuevoArtistaForm: FormGroup;
  show: boolean = false;
  newartist: boolean = false; //Indica la visibilidad del componente artista-form
  seeartist: boolean = false; //Indica la visibilidad del componente artista-detail
  artistaData: any; //Información del artista seleccionado
  loading: boolean = true;
  text: string = "";
  constructor(private _fb: FormBuilder,
    private _serviciosArtista: AccessArtistaService,
    private _message: AlertService,
    private _title: Title) {

    this._title.setTitle(Constante.tituloArtista);
  }

  ngOnInit() {
    this.getArtistas();
  }


  public getArtistas() {
    this._serviciosArtista.getAccessArtistas();
    this._serviciosArtista.getArtistas().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        this.artistas = res.body.data;
        this.show = true;
        this.loading = false;
      } else {
        this._message.error(res);
      }
    }, error => {
      this._message.error(Mensaje.noBackEnd);
    });
  }


  public getArtistasAfiliado() {
    this._serviciosArtista.getAccessArtistasAfiliado();
    this._serviciosArtista.getArtistasAfiliado().subscribe((res: any) => {
      if (res.status = Constante.ok) {
      } else {
        this._message.error(res);
      }
    }, error => {
      this._message.error(Mensaje.noBackEnd);
    });
  }


  /**
   * Method: setNuevoArtista
   * ----------------------------------------------------
   * Establece los valores vacíos para los campos del 
   * formulario al adicionar un nuevo artista.   
   */
  setNuevoArtista() {
    this.nuevoArtistaForm = this._fb.group({
      pais: ["", Validators.required],
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      genero: [""],
      sello: [""],
      facebook: [""],
      spotify: [""],
      instagram: [""],
      youtube: [""]
    });
  }

  /**
   * Method: nuevoArtista
   * ----------------------------------------------------
   * Actualiza la variable newartist para mostrar el 
   * formulario que permita adicionar un nuevo artista.
   * Además, oculta la información de artistas.
   */
  nuevoArtista() {
    var me = this;
    me.setNuevoArtista();
    me.show = false;
    me.newartist = true;
  }

  /**
   * Method: regresar
   * ----------------------------------------------------
   * Actualiza la variable show para mostrar el 
   * listado de artistas.
   * Además, oculta el formulario o la visualización del
   * detalle de un artista.
   */
  regresar() {
    var me = this;
    me.show = true;
    me.newartist = false;
    me.seeartist = false;
  }

  /**
   * Method: guardarArtista
   * ----------------------------------------------------
   * Guarda el nuevo artista o los cambios del artista
   */
  guardarArtista() {
    var me = this;
    me.newartist = false;
    me.show = true;
  }

  /**
   * Method: editarArtista
   * ----------------------------------------------------
   * Asigna la información del artista a editar y muestra
   * el formulario de edición.
   * 
   * @param  {Artista} obArtista Información del artista 
   *                             seleccionaado
   */
  editarArtista(obArtista: any) {
    var me = this,
      sbNombreArtista = obArtista.nombres.split(" ")[0],
      nuLength = sbNombreArtista.length,
      sbApellidos = obArtista.nombres.substr(nuLength + 1);

    console.log(obArtista);

    me.nuevoArtistaForm = me._fb.group({
      pais: [obArtista.pais, Validators.required],
      nombres: [sbNombreArtista, Validators.required],
      apellidos: [sbApellidos, Validators.required],
      genero: [""],
      sello: [obArtista.label],
      facebook: [obArtista.facebook],
      spotify: [obArtista.idSpotify],
      instagram: [obArtista.instagram],
      youtube: [obArtista.canalYoutube]
    });

    //Despliega el formulario
    me.show = false;
    me.newartist = true;
  }

  /**
   * Method: verDetalleArtista
   * ----------------------------------------------------
   * Asigna la información del artista a mostrar y despliega
   * la vista del detalle.
   * 
   * @param  {Artista} obArtista Información del artista 
   *                             seleccionaado
   */
  verDetalleArtista(obArtista: any) {
    var me = this;

    this.artistaData = obArtista;
    //Despliega la vista
    me.show = false;
    me.seeartist = true;
  }

}
