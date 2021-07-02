export interface Profesor {
    id?:number;
	nombres: string;
	apellidos: string;
	dni: string;
	direccion: string;
	telefono: string;
	email: string;
	fechaReg: Date;
	fechaMod: Date;
	estado: boolean;
}
