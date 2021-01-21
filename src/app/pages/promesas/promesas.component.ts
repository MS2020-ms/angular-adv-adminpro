import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //consumir promesa
    this.getUsuarios()
      .then(usuarios => {
        console.log(usuarios);
      });

    // const promesa = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Error');
    //   }
    // });

    // promesa
    //   .then((mensaje) => { console.log(mensaje); })
    //   .catch(error => console.log('Error en mi promesa', error));
  }

  getUsuarios() {

    return new Promise(resolve => {

      //fetch devuelve una promesa
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        //regresa una promesa y encadeno otro .then
        //la data según viene en respuesta de https://reqres.in/api/users
        .then(body => resolve(body.data));
    });

  }

}
