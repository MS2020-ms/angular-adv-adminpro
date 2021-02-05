import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';



@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public imagenSubs: Subscription;

  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  //prevengo fuga de memoria o listeners escuchando el cambio de una nueva imagen
  //me des-subscribo del Observable
  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    //me subscribo al Observable nuevaImagen del modal-imagen.service
    //refresca la vista actual mostarndo la imagen actualizada
    this.imagenSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => {
        //console.log(img);
        this.cargarMedicos()
      });
  }

  abrirModal(medico: Medico) {
    //console.log(medico);
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      //en el servicio retorno los medicos y no las respuesta (sería todo)
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos; //mi array de medicos = los medicos que recibo como argumento
        //console.log(medicos);
      });
  }

  buscar(termino: string) {
    //console.log(termino);

    //cuando borro el campo vuelve a cargar todos los usuarios
    //antes he creado la propiedad usuariosTemp y la igualado a usuarios al cargarUsuarios()
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {
        console.log(resp)
        //O Hacer un casteo de tipo Usuario de -> resultados as Usuario[]
        this.medicos = resp;
      });
  }

  borrarMedico(medico: Medico) {
    //SWEETALERT2: A confirm dialog, with a function attached to the "Confirm"-button...
    Swal.fire({
      title: 'Borrar medico?',
      text: `Estas seguro de borrar al medico ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {

        this.medicoService.borrarMedico(medico._id)
          .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire(
              'Borrado!',
              `El medico ${medico.nombre} ha sido borrado`,
              'success'
            );

          });
      }
    })
  }

}
