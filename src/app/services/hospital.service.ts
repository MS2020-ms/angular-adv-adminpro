import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  //Cargar hospitales en mantenimiento/hospitales [Extra: de forma paginada como usuarios]
  //localhost:3000/api/hospitales
  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    //peticion
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales) //resp.'hospitales' según retorna la peticion get hospitales -> ver postman
      );
  }

  //Crear hospital en mantenimiento/hospitales 
  //localhost:3000/api/hospitales
  crearHospital(nombre: string) {
    const url = `${base_url}/hospitales`;
    //peticion
    return this.http.post(url, { nombre }, this.headers);
  }

  //Actualizar hospital en mantenimiento/hospitales 
  //localhost:3000/api/hospitales/:id
  actualizarHospital(_id: string, nombre: string) { //_id: postman send actualizar Hospital
    const url = `${base_url}/hospitales/${_id}`;
    //peticion
    return this.http.put(url, { nombre }, this.headers);
  }

  //Borrar hospital en mantenimiento/hospitales 
  //localhost:3000/api/hospitales/:id
  borrarHospital(_id: string) { //_id: postman send actualizar Hospital
    const url = `${base_url}/hospitales/${_id}`;
    //peticion
    return this.http.delete(url, this.headers);
  }


}
