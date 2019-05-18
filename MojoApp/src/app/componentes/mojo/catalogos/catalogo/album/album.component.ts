import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccessAlbumService } from '../../../../../servicios/mojo/catalogos/catalogo/album/access.album.service';
import { Mensaje } from 'src/app/utilidades/mensaje';
import { AlertService } from '../../../../../servicios/alert/alert.service';
import { Constante } from '../../../../../utilidades/constante';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Input() albumForm:FormGroup;
  generos:any[];
  constructor(private _accessAlbum:AccessAlbumService,
              private _message:AlertService) { }

  ngOnInit() {
    this.getGenero();
  }


  getGenero(){
    this._accessAlbum.getGeneros();
    this._accessAlbum.getAccessGeneros().subscribe((res:any)=>{
      if(res.status== Constante.ok){
        this.generos = res.body.res;
      }else{
        this._message.error(res);
      }
    },(error)=>{
      this._message.error(Mensaje.noBackEnd);
    });
  }

}
