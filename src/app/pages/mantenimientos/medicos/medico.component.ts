import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  //mi formulario
  public medicoForm: FormGroup;
  //array de hospitales xa el select
  public hospitales: Hospital[] = [];
  //xa mostrar imagen e info del hospital seleccionado en select
  public hospitalSeleccionado: Hospital;
  //xa mostrar imagen del medico seleccionado en medicos-editar
  public medicoSeleccionado: Medico;


  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    //xa obtener el id del url (:id)
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    //obtengo todos los parametros del url (:id)
    //el nombre 'id' es el mismo que defino en el pages.routing
    this.activatedRoute.params.subscribe(({ id }) => {
      //console.log(id);
      this.cargarMedico(id);
      console.log('tick'); //para ver cuantas veces se dispara un subscribe -> si tengo fugas de memoria y tengo que unsubscribe()
    })

    //this.medicoService.getMedicoById()

    //defino el formulario segun body del envio en postman peticion crear medico
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],

    });

    this.cargarHospitales();

    //creo un observable sobre el campo 'hospital', me subscribo, si se produce un cambio en el select me devuelve el id del mismo. con el id puedo barrer mi array y obtener info del hospital
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        //console.log(hospitalId);
        this.hospitalSeleccionado = this.hospitales.find(hosp => hosp._id === hospitalId)
        //console.log(this.hospitalSeleccionado);
        console.log('tick'); //para ver cuantas veces se dispara un subscribe -> si tengo fugas de memoria y tengo que unsubscribe()
      })
  }

  cargarMedico(id: string) {
    //si es nuevo no voy a cargar medico
    if (id === 'nuevo') {
      return;
    }

    this.medicoService.getMedicoById(id)
      //retrasar la cargaMedico xa asegurarme que detecta el onChange del select. Cuando se carga la informacion despues establezco los valores. De origen medicoForm estan vacios '' y ahora tienen valor
      .pipe(
        delay(100)
      )
      .subscribe(medico => {
        //console.log(medico);
        //si no existe el medico a editar (regresa undefined) -> lo redirijo
        if (!medico) {
          //redirecciono (inyectar router)
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        //extraigo del objeto recibido medico, por destructuring el nombre y hospital-id
        const { nombre, hospital: { _id } } = medico;
        //console.log(nombre, _id);
        this.medicoSeleccionado = medico;
        //establezco los valores al formulario para verlo en los campos
        this.medicoForm.setValue({ nombre, hospital: _id })
      });
  }

  //cargo todos los hospitales desde mi servicio, xa luego mostrarlos en el select
  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        //console.log(hospitales);
        this.hospitales = hospitales;
      })
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value.nombre;

    //console.log(this.medicoSeleccionado);

    //si tengo un medico seleccionado -> actualizo, sino ->crear
    if (this.medicoSeleccionado) {
      //actualizar:
      //destructuring de la data reciba, xa enviar lo necesario a actualizarMedico()
      const data = {
        ...this.medicoForm.value, //destructuring de nombre y hospital
        _id: this.medicoSeleccionado._id //del medicoSeleccionado tomo el _id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          console.log(resp);
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success')
        })

    } else {
      //crear:
      //console.log(this.medicoForm.value);
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          //console.log(resp);
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success')
          //redirecciono (inyectar router)
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        })
    }
  }

}
