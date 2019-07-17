import { Component, OnInit } from '@angular/core';
import { ComunesService } from './servicios/mojo/comunes/comunes.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MojoApp';

  constructor(private _comunService:ComunesService){
              
  }

  ngOnInit(){
    //this.metodoPrueba();
  }

  metodoPrueba(){
    this._comunService.metodoPruebas().subscribe((res:any)=>{
      console.log("Prueba del servicios",res);
    });
  }

  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys'},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
  
  
}
