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
    {path:'ingresos',loadChildren:'./componentes/mojo/ingresos/ingresos/ingresos-module/ingresos.module#IngresosModule'},
    {path:'anticipo',loadChildren:'./componentes/mojo/ingresos/anticipo/anticipo-module/anticipo.module#AnticipoModule'},
    {path:'egresos',loadChildren:'./componentes/mojo/ingresos/egresos/egresos-module/egresos.module#EgresosModule'},
    {path:'youtube',loadChildren:'./componentes/mojo/youtube/youtube-module/youtube.module#YoutubeModule'},
    {path:'catalogo',loadChildren:'./componentes/mojo/catalogos/catalogo/catalogo-module/catalogo.module#CatalogoModule'},
    {path:'artista',loadChildren:'./componentes/mojo/catalogos/artista/artista-module/artista.module#ArtistaModule'},
    {path:'profile',loadChildren:'./componentes/mojo/profile/profile-module/profile.module#ProfileModule'},
    {path:'afiliado',loadChildren:'./componentes/mojo/afiliado/afiliado-module/afiliado.module#AfiliadoModule'},
    

    
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
 