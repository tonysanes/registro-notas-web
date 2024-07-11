export interface Profesor {
    id?:number;
	nombres: string;
	apellidos: string;
	fechaNac: Date;
	dni: string;
	genero: string;
	direccion: string;
	telefono: string;
	email: string;
	fechaReg: Date;
	fechaMod: Date;
	estado: boolean;
}
