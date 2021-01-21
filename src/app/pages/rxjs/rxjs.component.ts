//importar OnDestroy
import { Component, OnDestroy, OnInit } from '@angular/core';
//Importar interval, Subscription
import { Observable, interval, Subscription } from 'rxjs';
//Importar el retry, take, map, filter
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
//implementar OnDestroy
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubscripcion: Subscription;

  constructor() {

    // Elemento subscrito al Observable
    // Se ejecuta infinitamente, puede dar problemas de memoria -> cancelar las subscripciones
    // subscribe() -> value, error, complete
    // pipe() y retry() -> va a seguir intentandolo una y otra vez. retry(1) solo una vez

    /** this.retornaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Subscripcion:', valor),
      (error) => console.warn('Error: ', error),
      () => console.info('Obs terminado')
    );
    */

    //SUBSCRIBO al Observable
    //this.retornaIntervalo().subscribe((valor) => console.log(valor))
    this.intervalSubscripcion = this.retornaIntervalo().subscribe(console.log)

  }

  //* ngOnDestroy() + unsubscribe() => Va a terminar el Observable(es infinito)
  // si cambio de componente en el navegador -> se detiene
  ngOnDestroy(): void {
    this.intervalSubscripcion.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    //interval es un metodo de rxjs = setInterval
    //take() indica el numero de veces a realizar el intervalo
    //map() para transformar la info que recibe el observable y cambiarla (en vez de 0-9 => 1-10)
    //filter() para filtrar por condicion: si cumple es true, sino false
    return interval(500)
      .pipe(
        take(10),
        map(valor => {
          //return 'Hola Mundo ' + valor;
          return valor + 1; // 0 => 1
        }),
        filter(valor => (valor % 2 === 0) ? true : false) //filtra solo los pares

      );
  }

  retornaObservable(): Observable<number> {

    let i = -1;
    // Crear Observable de forma manual, el observer es quien esta observando
    const obs$ = new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        // siempre lo emitimos
        observer.next(i);

        if (i === 4) {
          // xa cancelar Interval
          clearInterval(intervalo);
          // finalizo mi observer
          observer.complete();
        }
        if (i === 2) {
          // console.log('i = 2...error');
          // termina el observer
          observer.error('i llego al valor de 2')
        }
      }, 1000)

    });
    return obs$;
  }

  ngOnInit(): void {
  }

}
