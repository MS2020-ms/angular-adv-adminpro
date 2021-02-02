import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

            default:
              return [];
          }
        })
      )
  }

}
