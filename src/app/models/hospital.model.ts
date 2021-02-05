//Interface => sencillo
//Class => incluye metodos dentro de mi modelo

// _ xa algo privado (privado porque no lo estoy exportando)
interface _HospitalUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser, //usuario que creo el registro del hospital

    ) { }

}