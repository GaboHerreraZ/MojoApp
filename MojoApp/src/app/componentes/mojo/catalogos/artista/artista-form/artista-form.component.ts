import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccessComunesService } from 'src/app/servicios/mojo/comunes/access.comunes.service';
import { Constante } from '../../../../../utilidades/constante';
import { Mensaje } from 'src/app/utilidades/mensaje';
import { AlertService } from '../../../../../servicios/alert/alert.service';

@Component({
  selector: 'app-artista-form',
  templateUrl: './artista-form.component.html',
  styleUrls: ['./artista-form.component.css']
})
export class ArtistaFormComponent implements OnInit {

  @Input() nuevoArtistaForm: FormGroup;
  //Listado de países
  paises: any[] = [];
  //Indica si existe información cargándose
  loading: boolean = true;
  //Titulo del formulario
  titulo: string = "Nuevo artista";
  //Mostra formulario
  show: boolean = false;

  constructor(private _serviciosComunes: AccessComunesService,
              private _message: AlertService) { }

  ngOnInit() {
    var me = this;
    //Carga la información de los países
    me.getPaises();
    //Verifica si es la edición o un nuevo artista
    me.titulo = me.nuevoArtistaForm.value.nombres != "" ? "Editar artista" : "Nuevo artista";
  }

  /**
   * Method: getPaises
   * ----------------------------------------------------
   * Obtiene la información de los países para la lista de
   * valores del formulario.
   */
  public getPaises() {
    var me = this;
    me._serviciosComunes.getAccessPaises();
    me._serviciosComunes.getPaises().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.paises = res.body.res;
        me.loading = false;
        me.show = true;
      } else {
        me._message.error(res);
      }
    }, error => {
      me._message.error(Mensaje.noBackEnd);
    });
  }



}
