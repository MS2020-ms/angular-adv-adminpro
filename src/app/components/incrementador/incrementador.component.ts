import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  progreso: number = 40;

  //getter
  get getPorcentaje() {
    return `${this.progreso}%`
  }

  //Funcion incrementa o decrementa barra de progreso en html
  cambiarValor(valor: number) {
    if (this.progreso >= 100 && this.progreso >= 0) {
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0) {
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
  }


}
