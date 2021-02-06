
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';



const routes: Routes = [

    //Rutas protegidas - rutas hijas (segento de rutas)
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard], //Protejo todas las rutas, sino logado -> no paso
        //Carga LAZYLOAD hacia mi modulo de rutas child-routes.module
        //solo se cargan las rutas si el usuario tiene el token valido
        canLoad: [AuthGuard],
        loadChildren: () => import('./child-routes.module').then(modulo => modulo.ChildRoutesModule)
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
//importar PagesRoutingModule en archivo app-routing.module.ts
export class PagesRoutingModule { }