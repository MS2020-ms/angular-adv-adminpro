import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  // guion bajo significa propiedad private
  private _ocultarModal: boolean = true;

  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  //creo un Observable
  //actualiazar automaticamente la imagen del avatar cuando selecciono nueva
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  //getter
  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    //ruta postman ver imagen
    //localhost:3000/api/uploads/usuarios/d00cc310-78a0-4898-a5ba-2e7e4048dce7.png
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${tipo}/${img}`
    }
    //console.log(this.img);

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
