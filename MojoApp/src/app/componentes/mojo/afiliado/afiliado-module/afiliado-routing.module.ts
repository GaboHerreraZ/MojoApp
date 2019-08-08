import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfiliadoComponent } from '../afiliado.component';

const routes: Routes = [
  {
    path:'', component:AfiliadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliadoRoutingModule { }
