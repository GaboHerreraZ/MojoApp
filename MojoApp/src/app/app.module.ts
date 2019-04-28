import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { ComunesService } from './servicios/mojo/comunes/comunes.service';
import { AlertComponent } from './componentes/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ComunesService],
  bootstrap: [AppComponent],
  //entryComponents: [ArtistaComponent]
})
export class AppModule { }
