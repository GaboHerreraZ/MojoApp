import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccessAlbumService } from '../../../../../servicios/mojo/catalogos/catalogo/album/access.album.service';
import { Mensaje } from 'src/app/utilidades/mensaje';
import { AlertService } from '../../../../../servicios/alert/alert.service';
import { Constante } from '../../../../../utilidades/constante';
import { AccessComunesService } from '../../../../../servicios/mojo/comunes/access.comunes.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Input() albumForm:FormGroup;
  generos:any[];
  loading:boolean = true;
  constructor(private _accessComun:AccessComunesService,
              private _message:AlertService) { }

  ngOnInit() {
    this.getGenero();
  }


  getGenero(){
    this._accessComun.getGeneros();
    this._accessComun.getAccessGeneros().subscribe((res:any)=>{
      if(res.status== Constante.ok){
        this.generos = res.body.res;
        
      }else{
        this._message.error(res.message);
      }
      this.loading = false;
    },(error)=>{
      this.loading = false;
      this._message.error(Mensaje.noBackEnd);
    });
  }

}
