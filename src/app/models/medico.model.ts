//Interface => sencillo
//Class => incluye metodos dentro de mi modelo

import { Hospital } from "./hospital.model";

// _ xa algo privado (privado porque no lo estoy exportando)
interface _MedicolUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _MedicolUser, //usuario que creo el registro del hospital
        public hospital?: Hospital,
    ) { }

}