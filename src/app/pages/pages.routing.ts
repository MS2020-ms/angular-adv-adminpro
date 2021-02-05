
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [

    //Rutas protegidas - rutas hijas (segento de rutas)
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard], //Protejo todas las rutas, sino logado -> no paso
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
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            //ruta dashboard/promesas  
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil del usuario' } },

            //### BUSQUEDAS GLOBAL
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },

            //### MANTENIMIENTOS:
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Medico' } },

            //### MANTENIMIENTOS: RUTAS DE ADMIN
            //implemento el Guard -> AdminGuard
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
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