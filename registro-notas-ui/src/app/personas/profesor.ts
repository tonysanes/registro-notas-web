export interface Profesor {
    id?:number;
	nombres: string;
	apellidos: string;
	dni: string;
	genero: string;
	direccion: string;
	telefono: string;
	email: string;
	fechaReg: Date;
	fechaMod: Date;
	fechaNac: Date;
	estado: boolean;
}
