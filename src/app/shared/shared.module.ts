import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //crea las directivas de ngFor ngIf
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';


//Modulo independiente de las rutas componentes compartidos:

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  //Lo exporto por si necesito estos componentes fuera de este modulo (shared.module.ts)
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  //Importar RouterModule -> RouterLink en sidebar.html
  imports: [
    CommonModule,
    RouterModule
  ]
})
//importar SharedModule en archivo pages.module.ts [SOLO donde los voy a utilizar]
export class SharedModule { }
