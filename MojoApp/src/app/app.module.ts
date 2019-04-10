import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { IngresosComponent } from './componentes/mojo/ingresos/ingresos.component';
import { AnaliticaComponent } from './componentes/mojo/analitica/analitica.component';
import { YoutubeComponent } from './componentes/mojo/youtube/youtube.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IngresosComponent,
    AnaliticaComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
