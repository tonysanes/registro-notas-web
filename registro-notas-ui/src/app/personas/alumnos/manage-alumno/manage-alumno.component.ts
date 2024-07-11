import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno } from '../../alumno';
import { SharePersonDataService } from '../../share-person-data.service';

import * as moment from 'moment';
import { PersonaService } from '../../persona.service';

@Component({
  selector: 'app-manage-alumno',
  templateUrl: './manage-alumno.component.html',
  styleUrls: ['./manage-alumno.component.scss']
})
export class ManageAlumnoComponent implements OnInit {

  currentAlumno: Alumno;
  alumnosForm: FormGroup;
  submitted = false;
  isEditing = false;
  title = "Registrar";

  niveles: any[]=[
    { value:"INICIAL", label:"Inicial" },
    { value:"PRIMARIA", label:"Primaria" },
    { value:"SECUNDARIA", label:"Secundaria" },
  ];

  grados: any[] = [];
  edad: string;

  constructor(public fb: FormBuilder, private alumnoService: SharePersonDataService, private personaService: PersonaService, private router: Router) { }

  ngOnInit(): void {
    this.isEditing = this.router.url.endsWith('edit');
    this.crearFormulario();
    if(this.isEditing){
      this.title = "Editar";
      this.getAlumnoFromService();
    }
  }
  
  getAlumnoFromService(){
    this.alumnoService.currentAlumno.subscribe(res => {
      this.currentAlumno = res;
      this.loadGradosByNivel(this.currentAlumno.nivel);
      this.inicializarFormulario();
      this.calcularEdad()
      console.log("Alumno desde segundo component: ", this.currentAlumno);
    });
  }

  crearFormulario(){
    this.alumnosForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      nivel: ['', Validators.required],
      grado: ['', Validators.required],
      seccion: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  inicializarFormulario(){
    this.alumnosForm.controls["nombres"].setValue(this.currentAlumno.nombres);
    this.alumnosForm.controls["apellidos"].setValue(this.currentAlumno.apellidos);
    this.alumnosForm.controls["email"].setValue(this.currentAlumno.email);
    this.alumnosForm.controls["telefono"].setValue(this.currentAlumno.telefono);
    this.alumnosForm.controls["nivel"].setValue(this.currentAlumno.nivel);
    this.alumnosForm.controls["grado"].setValue(this.currentAlumno.grado);
    this.alumnosForm.controls["seccion"].setValue(this.currentAlumno.seccion);
    this.alumnosForm.controls["genero"].setValue(this.currentAlumno.genero);
    this.alumnosForm.controls["direccion"].setValue(this.currentAlumno.direccion);
    let fechaNac = moment(this.currentAlumno.fechaNac).format('YYYY-MM-DD');
    this.alumnosForm.controls["fechaNacimiento"].setValue(fechaNac);
  }

  onChangeNivel(nivel:any){
    console.log(nivel);
    this.grados = [];
    let nivelValue = nivel.target.value;
    this.loadGradosByNivel(nivelValue);
  }

  submitAlumno(){
    this.submitted = true;
    if (this.alumnosForm.invalid) {
      return;
    }
    let jsonPersona=this.alumnosForm.value;
    jsonPersona['fechaNac']= new Date(this.alumnosForm.controls["fechaNacimiento"].value);
    if (this.isEditing) {
      jsonPersona['id']=this.currentAlumno.id;
      this.personaService.editarAlumno(jsonPersona).subscribe(res=>{
        this.router.navigate(['personas/alumnos']);
      });
    } else {
      this.personaService.registrarAlumno(jsonPersona).subscribe(res=>{
        this.router.navigate(['personas/alumnos']);
      });
    }
  }

  loadGradosByNivel(nivelValue: string){
    if(nivelValue == "INICIAL"){
      this.grados = [
        { value: "3 AÑOS", label: "3 años"},
        { value: "4 AÑOS", label: "4 años"},
        { value: "5 AÑOS", label: "5 años"}
      ];
    } else if(nivelValue == "PRIMARIA"){
      this.grados = [
        { value: "PRIMERO", label: "Primero"},
        { value: "SEGUNDO", label: "Segundo"},
        { value: "TERCERO", label: "Tercero"},
        { value: "CUARTO", label: "Cuarto"},
        { value: "QUINTO", label: "Quinto"},
        { value: "SEXTO", label: "Sexto"}
      ];
    } else if(nivelValue == "SECUNDARIA"){
      this.grados = [
        { value: "PRIMERO", label: "Primero"},
        { value: "SEGUNDO", label: "Segundo"},
        { value: "TERCERO", label: "Tercero"},
        { value: "CUARTO", label: "Cuarto"},
        { value: "QUINTO", label: "Quinto"}
      ];
    }
  }

  calcularEdad(){
    let fechaActual = moment();
    let age: any;
    if(this.isEditing){
      let fechaNac = moment(this.currentAlumno.fechaNac).format('YYYY-MM-DD');
      age = moment.duration(fechaActual.diff(fechaNac));
    } else {
      let fechaNac = moment(new Date(this.alumnosForm.controls["fechaNacimiento"].value)).format('YYYY-MM-DD');
      age = moment.duration(fechaActual.diff(fechaNac));
    }
    this.edad = "Edad: " + age.years() + " año(s) " + age.months() + " mes(es) ";
  }
  close(){
    this.router.navigate(['personas/alumnos']);
  }

}
