import {Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit, OnDestroy {
  
  show:boolean = true;
  step:boolean = false;
  albumForm:FormGroup;
  constructor(private _formBuilder:FormBuilder){
  }

  ngOnDestroy(){
  }

  ngOnInit(){
    this.albumForm = this._formBuilder.group({
      titulo:['',Validators.required],
      upc:['',Validators.required],
      artista:['',Validators.required],
      genero:['',Validators.required]
    });
  }


  nuevoAlbum(){
    this.show= false;
    this.step = true;
  }
}
