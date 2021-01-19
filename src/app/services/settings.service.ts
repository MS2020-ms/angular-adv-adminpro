import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //Del componente account-settings
  //Eficiente= xa saltar al DOM solo UNA vez, no ponerlo dentro de cambiarTemaColor()
  private linkTema = document.querySelector('#theme');

  constructor() {

    //Del componente account-settings
    //Recupero del LS el tema seleccionado en ultima navegacion por usuario
    const url = localStorage.getItem('tema') || './assets/css/colors/default-dark.css';
    this.linkTema.setAttribute('href', url);

  }

  cambiarTemaColor(tema: string) {

    const url = `./assets/css/colors/${tema}.css`;
    this.linkTema.setAttribute('href', url); //puro VANILLA JS
    localStorage.setItem('tema', url);

    this.checkActualTema();
  }

  checkActualTema() {

    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {

      elem.classList.remove('working');
      const btnTema = elem.getAttribute('data-theme');
      const btnTemaUrl = `./assets/css/colors/${btnTema}.css`;
      const actualTema = this.linkTema.getAttribute('href');

      if (btnTemaUrl === actualTema) {
        elem.classList.add('working');
      }
    });
  }
}
