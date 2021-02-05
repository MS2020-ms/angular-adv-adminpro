import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  //inyectar router xa poder navegar
  //confirmar que tenemos importado el RouterModule en el shared.module
  constructor(private usuarioService: UsuarioService,
    private router: Router) {

    //Los datos del usuario
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  //Log-Out
  //creo un metodo que llame al metodo logout de mi servicio
  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {
    //console.log(termino);
    //mando el texto del campo busqueda al url
    //si no hay termino escrito lo redirijo
    if (termino.length === 0) {
      //return;
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
