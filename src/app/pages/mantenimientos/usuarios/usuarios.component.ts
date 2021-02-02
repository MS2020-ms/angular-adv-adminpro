import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  //propiedades
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean = true;
  public imagenSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  //me dessubscribo al Observable
  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    //me subscribo al Observable nuevaImagen del modal-imagen.service
    //refresca la vista actual mostarndo la imagen actualizada
    this.imagenSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        //console.log(img);
        this.cargarUsuarios()
      });
  }

  cargarUsuarios() {
    //mensaje con spin de carga
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        //console.log(resp);
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        //quitar mensaje con spin de carga
        this.cargando = false;
      })
  }

  //xa botones anterior y siguiente
  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    //console.log(termino);

    //cuando borro el campo vuelve a cargar todos los usuarios
    //antes he creado la propiedad usuariosTemp y la igualado a usuarios al cargarUsuarios()
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe(resultados => {
        console.log(resultados)
        this.usuarios = resultados;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    //console.log(usuario);

    //NO BORRARSE A UNO MISMO
    if (usuario.user_id === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    //console.log('esto no se tiene que ver');
    //return;

    //SWEETALERT2: A confirm dialog, with a function attached to the "Confirm"-button...
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Estas seguro de borrar al usuaro ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Borrado!',
              `El usuario ${usuario.nombre} ha sido borrado`,
              'success'
            );

          });
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    //console.log(usuario);
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);

      })
  }

  //metodo abrir Modal
  abrirModal(usuario: Usuario) {
    //console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.user_id, usuario.img);
  }

}
