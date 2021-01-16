import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  //Input progreso desde progress (Padre) a incrementador (Hijo)
  //Renombrar el argumento que recibo desde Padre ('valor')
  //@Input('valor') progreso: number = 40;
  @Input() progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  //Output desde incrementador (Hijo) a progress (Padre)
  //emite un evento desde incrementador (Hijo)
  //Renombrar el argumento que emito desde Hijo ('valor')
  //@Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  //Funcion incrementa o decrementa barra de progreso en html
  cambiarValor(valor: number) {
    if (this.progreso >= 100 && this.progreso >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

  // Metodo recoge evento de escribir en input
  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);

  }

}
