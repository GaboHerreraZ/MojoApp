import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { AlertService } from '../../servicios/alert/alert.service';
import { Title } from '@angular/platform-browser';
import { Constante } from '../../utilidades/constante';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  newPassword:boolean = false;
  requiredAttributes:any;
  user:any;
  isLoggedIn$:Observable<boolean>;
  show:boolean;
  loading:boolean;
  mensajeError:string=null;
  constructor(private _authService:AuthService,
              private _formBuilder: FormBuilder,
              private _router:Router,
              private _message:AlertService,
              private _title:Title) 
              { 
                this._title.setTitle(Constante.tituloLogin);
              }

  ngOnInit() {
    this.loading = false;
    this.initForm();
  }




  initForm(){
    this.show = true;
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { 
    return this.loginForm.controls; 
  }

  login() {
    this.mensajeError = null;
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.invalid) {
        this.loading = false;
        return;
    }
    const {email,password} = this.loginForm.value;
    this._authService.signIn(email, password)
        .pipe(first())
        .subscribe(
            user => {
                this.user = user;
                 if(user.challengeName ==='NEW_PASSWORD_REQUIRED'){
                    this.requiredAttributes = user.challengeParam;
                    this.newPassword = true;
                 }else{
                    this.show = false;
                    this._router.navigate(['/mojo/analitica']);
                 }
            },
            error => {
                  this.loading = false;
                  //console.log("error",error.message);
                  this.mensajeError = error.message;
                  //this._message.error(error.message);
            });
      }

      resetPassword(){
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        const {email,password} = this.loginForm.value;
        this._authService.completePassword(this.user,password,null)
            .pipe(first())
            .subscribe(
              (user:any)=>{
                this.user = user;
              },error=>{
                this.loading = false;
                  this._message.error(error.message);
              }
            );
      }

   
    }



