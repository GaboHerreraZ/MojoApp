import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresosComponent } from './componentes/mojo/ingresos/ingresos.component';
import { AnaliticaComponent } from './componentes/mojo/analitica/analitica.component';
import { YoutubeComponent } from './componentes/mojo/youtube/youtube.component';

const routes: Routes = [
{path:'ingresos',component:IngresosComponent},
{path:'analitica',component:AnaliticaComponent},
{path:'youtube',component:YoutubeComponent},
{path:'',redirectTo:'/ingresos',pathMatch:'full'},
{path:'**',redirectTo:'/ingresos',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
