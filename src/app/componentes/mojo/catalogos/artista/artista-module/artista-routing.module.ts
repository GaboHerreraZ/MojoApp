import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistaComponent } from '../artista.component';

const routes: Routes = [
  {path:'',component:ArtistaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistaRoutingModule { }
