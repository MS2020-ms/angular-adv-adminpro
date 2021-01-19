
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [

    //Rutas protegidas - rutas hijas (segento de rutas)
    {
        path: 'dashboard', component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent }, //ruta dashboard/progress
            { path: 'grafica1', component: Grafica1Component },  //ruta dashboard/grafica1
            { path: 'account-settings', component: AccountSettingsComponent }  //ruta dashboard/account-settings

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