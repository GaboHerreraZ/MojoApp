import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { ComunesService } from './servicios/mojo/comunes/comunes.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent
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
