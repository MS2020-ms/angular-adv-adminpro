import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  //subir archivo con puro JS -> fetchAPI or http

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {

    try {

      const url = `${base_url}/uploads/${tipo}/${id}`;
      //xa enviar informacion al BACKEND mediante peticion fetch (propio de JS)
      const formData = new FormData();
      formData.append('imagen', archivo);

      //peticion fetch
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token_a_fh') || ''
        },
        body: formData
      });

      //console.log(resp);

      const data = await resp.json();
      console.log(data);

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }

}



