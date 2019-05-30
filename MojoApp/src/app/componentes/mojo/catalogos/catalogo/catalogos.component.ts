import {Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artista } from '../../../../modelos/ArtistaModel';



@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit, OnDestroy {
  
  show:boolean = true;
  step:boolean = false;
  text:string="";
  albumForm:FormGroup;
  albumes = albumes;
  loading:boolean = false;
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


const albumes:any[]=[
  { 
    nombre:"Black album",
    upc:"Upc1",
    artista: "Metallica"
  },
  { 
    nombre:"Appetite for destruction",
    upc:"Upc1",
    artista: "Guns and roses"
  },
  { 
    nombre:"Use your illusion I",
    upc:"Upc1",
    artista: "Guns and roses"
  },
  { 
    nombre:"Use your illusion II",
    upc:"Upc1",
    artista: "Guns and roses"
  }
]