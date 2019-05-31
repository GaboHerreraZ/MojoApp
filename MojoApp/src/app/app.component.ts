import { Component, OnInit } from '@angular/core';
import { ComunesService } from './servicios/mojo/comunes/comunes.service';

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
  
  
}
