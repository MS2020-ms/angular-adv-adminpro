import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  //Opciones de mi menu lateral
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: '/dashboard/progress' },
        { titulo: 'Graficas', url: '/dashboard/grafica1' },
        { titulo: 'Promesas', url: '/dashboard/promesas' },
        { titulo: 'rxjs', url: '/dashboard/rxjs' },
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/dashboard/usuarios' },
        { titulo: 'Hospitales', url: '/dashboard/hospitales' },
        { titulo: 'Medicos', url: '/dashboard/medicos' }
      ]
    },
  ];

  constructor() { }
}
