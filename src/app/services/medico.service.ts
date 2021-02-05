import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }


  //getter para recuperar token desde LS
  get token(): string {
    return localStorage.getItem('token_a_fh') || '';
  }

  //getter para enviar los headers
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  //Cargar medicos en mantenimiento/medicos [Extra: de forma paginada como usuarios]
  //localhost:3000/api/medicos
  cargarMedicos() {
    const url = `${base_url}/medicos`;
    //peticion
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos) //resp.'medicos' según retorna la peticion get medicos -> ver postman
      );
  }

  getMedicoById(id: string) {
    const url = `${base_url}/medicos/${id}`;
    //peticion
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico: Medico }) => resp.medico) //resp.'medico' según retorna la peticion getMedicoById -> ver postman
      );
  }

  //Crear medico en mantenimiento/medicos
  //localhost:3000/api/medicos
  crearMedico(medico: { nombre: string, hospital: string }) {
    const url = `${base_url}/medicos`;
    //peticion
    return this.http.post(url, medico, this.headers);
  }

  //Actualizar medico en mantenimiento/medicos 
  //localhost:3000/api/medicos/:id
  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    //peticion
    return this.http.put(url, medico, this.headers);
  }

  //Borrar medico en mantenimiento/medicos 
  //localhost:3000/api/medicos/:id
  borrarMedico(_id: string) { //_id: postman send actualizar Medico
    const url = `${base_url}/medicos/${_id}`;
    //peticion
    return this.http.delete(url, this.headers);
  }


}
