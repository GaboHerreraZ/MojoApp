import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { GuardService } from './servicios/auth/guard.service';

const routes: Routes = [
{path:'analitica',loadChildren:'./componentes/mojo/analitica/analitica-module/analitica.module#AnaliticaModule',canActivate:[GuardService]},
{path:'ingresos',loadChildren:'./componentes/mojo/ingresos/ingresos-module/ingresos.module#IngresosModule',canActivate:[GuardService]},
{path:'youtube',loadChildren:'./componentes/mojo/youtube/youtube-module/youtube.module#YoutubeModule',canActivate:[GuardService]},
{path:'catalogo',loadChildren:'./componentes/mojo/catalogos/catalogo/catalogo-module/catalogo.module#CatalogoModule',canActivate:[GuardService]},
{path:'artista',loadChildren:'./componentes/mojo/catalogos/artista/artista-module/artista.module#ArtistaModule',canActivate:[GuardService]},
{path:'login',component:LoginComponent},
{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'**',redirectTo:'/analitica',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 