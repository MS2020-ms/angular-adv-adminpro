import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    //xa ver en los campos los datos del usuario -> nombre y perfil
    //xa actualizar el perfil de mi pagina automaticamente al actualizar perfil
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil() {
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp => {
        //console.log(resp);
        //xa actualizar el perfil de mi pagina automaticamente al actualizar perfil
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        //Mostrar Mensaje con SWEETALERT2
        //('titulo'-'mensaje'-icono)
        Swal.fire('Guardado', 'Cambios de perfil actualizados', 'success');
      }, (err) => {
        //Mostrar Error con SWEETALERT2
        //Si sucede un error (mensaje, error, icono)
        //ejemplos de sweetalert en https://sweetalert2.github.io/ - examples
        Swal.fire('Error!', err.error.msg, 'error');
      });
  }

  //metodo de seleccion de imagen
  cambiarImagen(file: File) {
    //console.log(event);
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    //para previsualizar la imagen a cambiar previo a click en boton
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      //console.log(reader.result);
      this.imgTemp = reader.result;
    }
  }

  //metodo del boton click 
  //actualizar imagen de perfil automaticamente
  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.user_id)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
        Swal.fire('Error!', err.error.msg, 'error');
      });
  }

}
