
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [

    //Rutas protegidas - rutas hijas (segento de rutas)
    {
        path: 'dashboard', component: PagesComponent,
        children: [
            //para enviar parametros o argumentos por la ruta -> propiedad 'data'
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            //ruta dashboard/progress
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            //ruta dashboard/grafica1
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
            //ruta dashboard/account-settings  
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Cuenta' } },
            //ruta dashboard/promesas  
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            //ruta dashboard/promesas  
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } }
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
//importar PagesRoutingModule en archivo app-routing.module.ts
export class PagesRoutingModule { }