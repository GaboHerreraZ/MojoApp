import { Injectable } from '@angular/core';
import Swal  from "sweetalert2";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  swal:any
  constructor() { 
    this.swal = Swal.mixin({
      toast: true,
      position:'top-end',
      showConfirmButton:false,
      timer:3000,
      background:'#161616',
      customClass:{
        title:'color-text ',
        content:'color-text',
      }
    });
  }


  success(message:string){
    this.swal.fire({
      type:'success',
      title: 'OK!!',
      text:message
    })
  }

  error(message:string){
    this.swal.fire({
      type:'error',
      title:'Error!!',
      text:message
    })
  }

  info(message:string){
    this.swal.fire({
      type:'info',
      title:'Info!!',
      text:message
    })
  }




}
