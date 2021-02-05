import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private busquedasSerice: BusquedasService,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ termino }) =>
        //console.log(termino);
        this.busquedaGlobal(termino)
      )
  }

  busquedaGlobal(termino: string) {
    this.busquedasSerice.busquedaGlobal(termino)
      //resp:any xa no haya problema de tipado
      .subscribe((resp: any) => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      })
  }

  abrirMedico(medico: Medico) {
    this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);
  }

}