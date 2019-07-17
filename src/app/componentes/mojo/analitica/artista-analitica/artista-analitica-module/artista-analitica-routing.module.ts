import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistaAnaliticaComponent } from '../artista-analitica.component';

const routes: Routes = [
  {path:'', component:ArtistaAnaliticaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistaRoutingModule { }
