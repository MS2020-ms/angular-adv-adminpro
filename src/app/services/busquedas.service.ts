import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.user_id)
    );
  }

  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados;
  }

  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados;
  }

  //localhost:3000/api/todo/:termino
  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    //peticion
    return this.http.get(url, this.headers);
  }

  //localhost:3000/api/todo/coleccion/usuarios/ivana
  buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    //peticion
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.usuarios);

            case 'hospitales':
              //resp.usuarios->asi es como me devuelve la peticion en postman de hospitales?
              return this.transformarHospitales(resp.usuarios);

            case 'medicos':
              //resp.usuarios->asi es como me devuelve la peticion en postman de medicos?
              return this.transformarMedicos(resp.usuarios);

            default:
              return [];
          }
        })
      )
  }

}
