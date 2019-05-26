import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccessComunesService } from 'src/app/servicios/mojo/comunes/access.comunes.service';
import { Constante } from '../../../../../utilidades/constante';

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

  constructor(private _serviciosComunes: AccessComunesService) { }

  ngOnInit() {
    this.getPaises();
  }

  public getPaises() {
    var me = this;
    me._serviciosComunes.getAccessPaises();
    me._serviciosComunes.getPaises().subscribe((res: any) => {
      if (res.status = Constante.ok) {
        me.paises = res.body.res;
        me.loading = false;
      } else {
        //Error
      }
    }, error => {
      //Error
    });
  }

}
