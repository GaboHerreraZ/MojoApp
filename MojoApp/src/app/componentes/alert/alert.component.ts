import { Component, OnInit } from '@angular/core';
import { ComunesService } from '../../servicios/mojo/comunes/comunes.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  config: any;
  type: string;
  titulo: string;
  mensaje: string;
  showPositiveButton: boolean;
  showNegativeButton: boolean;
  positiveButtonText: string;
  negativeButtonText: string;
  siFn: () => void;
  noFn: () => void;

  constructor(private serviciosComunes: ComunesService) {
    this.type = null;
  }

  init(config: any) {
    console.log("AlertComponent init");
    console.log(config);
    if(config !== undefined){
      this.config = config;
      this.type = config.type;
      this.titulo = config.titulo;
      this.mensaje = config.mensaje;
      this.showNegativeButton = config.showNegativeButton;
      this.showPositiveButton = config.showPositiveButton;
      this.positiveButtonText = config.positiveButtonText;
      this.negativeButtonText = config.negativeButtonText;
      this.siFn = config.siFn;
      this.noFn = config.noFn;
    }
  }

  ngOnInit() {
    //this function waits for a message from alert service, it gets 
    //triggered when we call this from any other component 
    this.serviciosComunes.getMessage().subscribe(config => {
      this.init(config);
    });
  }

}
