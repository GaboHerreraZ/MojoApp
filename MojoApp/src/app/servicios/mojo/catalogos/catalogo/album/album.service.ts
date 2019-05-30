import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Operacion } from 'src/app/utilidades/operacion';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlbumService implements OnInit{

    constructor(private _http:HttpClient){

    }

    ngOnInit(){

    }


  
}
