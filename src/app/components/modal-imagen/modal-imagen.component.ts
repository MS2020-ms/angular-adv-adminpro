import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = '';

  //public para utilizar por referencia a las propiedades directamente en el html
  constructor(public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        //xa actualiazar automaticamente la imagen del avatar cuando selecciono nueva
        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch(err => {
        Swal.fire('Error!', err.error.msg, 'error');
      });
  }

}
