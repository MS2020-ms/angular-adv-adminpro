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
        { titulo: 'Graficas', url: '/dashboard/grafica1' }
      ]
    },
    // {
    //   titulo: 'Dashboard 2',
    //   icono: 'mdi mdi-gauge',
    //   submenu: [
    //     { titulo: 'Secondary', url: '/' },
    //     { titulo: 'ProgressBar', url: '/dashboard/progress' },
    //     { titulo: 'Graficas', url: '/dashboard/grafica1' }
    //   ]
    // },
  ];

  constructor() { }
}
