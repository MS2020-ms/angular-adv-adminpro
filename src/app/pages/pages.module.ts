import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //crea las directivas de ngFor ngIf
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
//equivale:
//import { AppRoutingModule } from '../app-routing.module'; 


//Modulo independiente de las rutas autenticadas:

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  //Lo exporto por si necesito estos componentes fuera de este modulo (pages.module.ts)
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  //import RouterModule, SharedModule [SOLO donde los voy a utilizar]
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
//importar PagesModule en archivo app.module.ts
export class PagesModule { }
