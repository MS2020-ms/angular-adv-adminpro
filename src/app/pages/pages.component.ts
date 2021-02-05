import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

//primero declaro la funcion que esta de manera global en mi aplicacion
declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  //Inyecto servicio en el constructor
  constructor(private settingsService: SettingsService,
    private sidebarService: SidebarService) { }

  ngOnInit(): void {
    //llamo la funcion desde "./assets/js/custom.min.js"
    customInitFunction();
    this.sidebarService.cargarMenu();
  }

}
