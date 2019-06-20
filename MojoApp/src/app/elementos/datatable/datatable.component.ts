import { Component, OnInit, Input } from '@angular/core';
import { config } from 'aws-sdk/global';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  constructor() { }
  show:boolean = true;
  searchText:string="";

  @Input() config;any;

  ngOnInit() {
  }

  /*config: any ={
    column:["Artista","Ingresos","Publicación","Total"],
    columnType:["text","text","text","currency"],
    data:[
      ["El pepo1","123464","123464","123464"],
      ["El pepo2","123464","123464","123464"],
      ["El pepo3","123464","123464","123464"]
    ],
    buttons:[
      {
        title:"Ver detalle",
        type:"icon",
        icon:"fa fa-eye",
      }
    ],
    filter: true
}*/

  public showData(){
    this.show = true;
  }

  save(register:any){
    this.show = false;
    localStorage.setItem("register",register);
  }
  

}
