import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{path:'analitica',loadChildren:'./componentes/mojo/analitica/analitica-module/analitica.module#AnaliticaModule'},
{path:'ingresos',loadChildren:'./componentes/mojo/ingresos/ingresos-module/ingresos.module#IngresosModule'},
{path:'youtube',loadChildren:'./componentes/mojo/youtube/youtube-module/youtube.module#YoutubeModule'},
{path:'catalogo',loadChildren:'./componentes/mojo/catalogos/catalogo/catalogo-module/catalogo.module#CatalogoModule'},
{path:'artista',loadChildren:'./componentes/mojo/catalogos/artista/artista-module/artista.module#ArtistaModule'},
{path:'',redirectTo:'/analitica',pathMatch:'full'},
{path:'**',redirectTo:'/analitica',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
