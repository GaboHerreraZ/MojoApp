import { Component, OnInit } from '@angular/core';
import { ComunesService } from './servicios/mojo/comunes/comunes.service';
import { AuthService } from './servicios/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MojoApp';
  constructor(private _authService:AuthService){

  }

  ngOnInit(){
  }

  
  
}
