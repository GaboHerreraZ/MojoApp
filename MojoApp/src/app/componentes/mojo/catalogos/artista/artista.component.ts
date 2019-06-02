import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AccessArtistaService } from 'src/app/servicios/mojo/artista/access.artista.service';
import { AlertService } from '../../../../servicios/alert/alert.service';
import { Mensaje } from '../../../../utilidades/mensaje';
import { Title } from '@angular/platform-browser';
import { Constante } from '../../../../utilidades/constante';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Pais } from '../../../../modelos/pais';


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
  update: boolean = false; //Indica si el formulario está en modo edición
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
        this.artistas = res.body.result.data;
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
      paisId: [this._fb.group({}), Validators.required],
      nombres: ["", Validators.required],
      label: [""],
      facebook: [""],
      idSpotify: [""],
      instagram: [""],
      canalYoutube: [""]
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
    me.update = false;
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
    me.update = false;
  }

  /**
   * Method: guardarArtista
   * ----------------------------------------------------
   * Guarda el nuevo artista o los cambios del artista
   */
  guardarArtista() {
    var me = this;
    if (me.update) {
      me.actualizarDatosArtista(me.nuevoArtistaForm.value);
    } else {
      me.insertarNuevoArtista(me.nuevoArtistaForm.value);
    }
  }

  /**
   * Method: insertarNuevoArtista
   * ----------------------------------------------------
   * Invoca el servicio para insertar un nuevo artista.
   * 
   * @param  {Artista} obArtista Información del nuevo artista        
   */
  public insertarNuevoArtista(obArtista: any) {
    if((obArtista.paisId instanceof  Pais)=== false){
      this._message.info(Mensaje.noPais);        
      return;
    }
    var me = this;
    this.loading = true;
    me._serviciosArtista.insertAccessArtista(obArtista);
    me._serviciosArtista.getNuevoArtista().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.newartist = false;
        me.show = true;
        this.loading = false;
        this._message.success(res.body.mensaje);
        this.getArtistas();
      } else {
        this._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }

  /**
   * Method: actualizarDatosArtista
   * ----------------------------------------------------
   * Invoca el servicio para editar la información de un
   * artista.
   * 
   * @param  {Artista} obArtista Información del nuevo artista        
   */
  public actualizarDatosArtista(obArtista: any) {
    if((obArtista.paisId instanceof  Pais)=== false){
      this._message.info(Mensaje.noPais);        
      return;
    }
    this.loading = true;
    var me = this;
    me._serviciosArtista.updateAccessArtista(obArtista);
    me._serviciosArtista.getEdicionArtista().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.newartist = false;
        me.show = true;
        me.loading = false;
        this._message.success('Se actualiza correctamente el artista');
        this.getArtistas();
      } else {
        this._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
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
    var me = this;
    me.nuevoArtistaForm = me._fb.group({
      id: [obArtista.id, Validators.required],
      paisId: [obArtista.pais, Validators.required],
      nombres: [obArtista.nombres, Validators.required],
      label: [obArtista.label],
      facebook: [obArtista.facebook],
      idSpotify: [obArtista.idSpotify],
      instagram: [obArtista.instagram],
      canalYoutube: [obArtista.canalYoutube]
    });

    //Despliega el formulario
    me.show = false;
    me.newartist = true;
    me.update = true;
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
