import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imagenSubs: Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  //me des-subscribo del Observable
  //prevengo fuga de memoria o listeners escuchando el cambio de una nueva imagen
  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    //me subscribo al Observable nuevaImagen del modal-imagen.service
    //refresca la vista actual mostarndo la imagen actualizada
    this.imagenSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => {
        //console.log(img);
        this.cargarHospitales()
      });
  }

  buscar(termino: string) {
    //console.log(termino);
    //cuando borro el campo vuelve a cargar todos los hospitales
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resultados => {
        //console.log(resultados)
        //Hacer un casteo de tipo Hospital
        this.hospitales = resultados as Hospital[];
      });
  }

  cargarHospitales() {
    //para ver el spin de carga
    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        console.log(hospitales);
        this.cargando = false;
        this.hospitales = hospitales;

      })
  }

  //Es un Observable -> subscribe
  guardarCambios(hospital: Hospital) {
    //console.log(hospital);
    //(hospital._id, hospital.nombre) en el mismo orden que def en hospital.service
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  //Es un Observable -> subscribe
  eliminarHospital(hospital: Hospital) {
    //console.log(hospital);
    //(hospital._id, hospital.nombre) en el mismo orden que def en hospital.service
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(resp => {
        //recargo los hospitales para visualizar los cambios automaticamente sin hacer refresh del navegador
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      });
  }

  //Modal para Crear Hospital
  //ir https://sweetalert2.github.io/#input-types ->Input Types / url (copio)
  //desestructuro el value, lo inicializo vacio '', xa no de error al cancelar
  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear nuevo Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    })
    //console.log(value);
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital);
          Swal.fire(`Creado: ${resp.hospital.nombre}`)
        })
    }
  }

  abrirModal(hospital: Hospital) {
    //console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
