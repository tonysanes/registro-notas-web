export interface Alumno {
    id?:number;
	nombres: string;
	apellidos: string;
    fechaNac: Date;
	nivel: string;
	grado: string;
	seccion: string;
	genero: string;
	direccion: string;
	telefono: string;
	email: string;
	fechaRegistro: Date;
	fechaModificacion: Date;
	estado: boolean;
}
