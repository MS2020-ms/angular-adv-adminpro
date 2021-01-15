import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //(xa ngFor ngIf)
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { Error404Component } from './error404/error404.component';

//Creo rutas
const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting

  // Ruta inicio y error
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: Error404Component },
]

//import RouterModule, PagesRoutingModule (Rutas hijas), AuthRoutingModule
//export RouterModule
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
