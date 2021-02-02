import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {
    uid: string;
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public user_id?: string
    ) { }

    imprimirUsuario() {
        //console.log(this.nombre);
    }

    //tipo getter permite obtener la imagen
    get imagenUrl() {

        //console.log(this.img);
        if (!this.img) {
            return `${base_url}/uploads/usuarios/no-image`;
        } else if (this.img.includes('https')) {
            //si estoy logado con google-In  -> toma mi imagen de Google
            return this.img;
        } else if (this.img) {
            return `${base_url}/uploads/usuarios/${this.img}`;
        } else {
            return `${base_url}/uploads/usuarios/no-image`;
        }
    }

}