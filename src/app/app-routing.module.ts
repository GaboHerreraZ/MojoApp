import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { GuardService } from './servicios/auth/guard.service';
import { PaginasComponent } from './componentes/mojo/paginas.component';

const routes: Routes = [
{ path:'mojo',
  component:PaginasComponent,
  canActivate:[GuardService],
  children:[
    {path:'analitica',loadChildren:'./componentes/mojo/analitica/analitica/analitica-module/analitica.module#AnaliticaModule',},
    {path:'artista-analitica',loadChildren:'./componentes/mojo/analitica/artista-analitica/artista-analitica-module/artista-analitica.module#ArtistaAnaliticaModule',},
    {path:'ingresos',loadChildren:'./componentes/mojo/ingresos/ingresos-module/ingresos.module#IngresosModule'},
    {path:'youtube',loadChildren:'./componentes/mojo/youtube/youtube-module/youtube.module#YoutubeModule'},
    {path:'catalogo',loadChildren:'./componentes/mojo/catalogos/catalogo/catalogo-module/catalogo.module#CatalogoModule'},
    {path:'artista',loadChildren:'./componentes/mojo/catalogos/artista/artista-module/artista.module#ArtistaModule'},
    {path:'',redirectTo:'/mojo/analitica',pathMatch:'full'},
    {path:'**',redirectTo:'/mojo/analitica',pathMatch:'full'},

  ]
},
{path:'login',component:LoginComponent},
{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'**',redirectTo:'/login',pathMatch:'full'},




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
