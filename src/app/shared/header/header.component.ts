import { Component, OnInit } from '@angular/core';
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

  constructor(private usuarioService: UsuarioService) {

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
}
