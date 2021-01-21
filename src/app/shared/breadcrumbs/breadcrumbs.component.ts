//importar OnDestroy
import { Component, OnDestroy, OnInit } from '@angular/core';
//importar ActivationEnd, Router, Subscription, map y filter!
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  //inyecto Router, donde tengo la informacion del nombre de la ruta ('data') -> pages.routing.ts
  //inyecto solo  private route: ActivatedRoute si quiero usar directamente
  constructor(private router: Router) {

    //console.log(route.snapshot.children[0].data);

    this.tituloSubs$ = this.getArgumentosRuta();

  }
  //cuando hago logout me unsubscribo del observable
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    //events es un Observable -> me subscribo
    //en ActivationEnd es donde viene la 'data'
    return this.router.events
      .pipe(
        //filtro: solo los ActivationEnd
        filter(event => event instanceof ActivationEnd),
        //filtro: solo de los ActivationEnd que no tengan firtChild = null
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        //map: extraer solo la data
        map((event: ActivationEnd) => event.snapshot.data),
      )
      .subscribe(data => {
        //console.log(data);
        this.titulo = data.titulo;
        document.title = `AdminPro - ${data.titulo}`;
      });
  }

  ngOnInit(): void {
  }

}
