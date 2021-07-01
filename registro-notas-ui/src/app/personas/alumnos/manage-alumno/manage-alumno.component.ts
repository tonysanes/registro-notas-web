import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../persona.service';
import * as moment from 'moment';
import { Persona } from '../../persona';

@Component({
  selector: 'app-manage-alumno',
  templateUrl: './manage-alumno.component.html',
  styleUrls: ['./manage-alumno.component.scss']
})
export class ManageAlumnoComponent implements OnInit {
  //Parametro de entrada alumo object
  @Input() inputAlumno: Persona;
  @Input() action: string;
  @Output() refreshPersonas = new EventEmitter();

  //Parametro de entrada y salida: flag
  @Input() showEditForm: any;
  @Output() showEditFormChange = new EventEmitter();
  alumnosForm: FormGroup;
  title: string;
  submitted = false;

  niveles: any[]=[
    { value:"INICIAL", label:"Inicial" },
    { value:"PRIMARIA", label:"Primaria" },
    { value:"SECUNDARIA", label:"Secundaria" },
  ];

  grados: any[] = [];
  edad: string;
  
  constructor( public fb: FormBuilder, public datepipe: DatePipe, private personaService: PersonaService) { }

  ngOnInit() {
    console.log(this.inputAlumno);
    console.log(this.action);
    this.crearFormulario();
    if (this.action=="Editar") {
      this.title="Editar Alumno";
      this.loadGradosByNivel(this.inputAlumno.nivel);
      this.inicializarFormulario();
      this.calcularEdad()
    }else{
      this.title="Registrar Alumno";
    }

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
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  inicializarFormulario(){
    this.alumnosForm.controls["nombres"].setValue(this.inputAlumno.nombres);
    this.alumnosForm.controls["apellidos"].setValue(this.inputAlumno.apellidos);
    this.alumnosForm.controls["email"].setValue(this.inputAlumno.email);
    this.alumnosForm.controls["telefono"].setValue(this.inputAlumno.telefono);
    this.alumnosForm.controls["nivel"].setValue(this.inputAlumno.nivel);
    this.alumnosForm.controls["grado"].setValue(this.inputAlumno.grado);
    this.alumnosForm.controls["seccion"].setValue(this.inputAlumno.seccion);
    this.alumnosForm.controls["direccion"].setValue(this.inputAlumno.direccion);
    let fechaNac = moment(this.inputAlumno.fechaNac).format('YYYY-MM-DD');
    this.alumnosForm.controls["fechaNacimiento"].setValue(fechaNac);
  }

  onChangeNivel(nivel:any){
    console.log(nivel);
    this.grados = [];
    let nivelValue = nivel.target.value;
    this.loadGradosByNivel(nivelValue);
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

  close(){
    this.showEditForm = false;
    this.showEditFormChange.emit(this.showEditForm);
  }

  submitAlumno(){
    this.submitted = true;
    if (this.alumnosForm.invalid) {
      return;
    }
    let jsonPersona=this.alumnosForm.value;
    jsonPersona['fechaNac']= new Date(this.alumnosForm.controls["fechaNacimiento"].value);
    if (this.action=="Editar") {
      jsonPersona['id']=this.inputAlumno.id;
      this.personaService.editarAlumno(jsonPersona).subscribe(res=>{
        this.refreshPersonas.emit(true);
        this.close();
      });
    }else{
      this.personaService.registrarAlumno(jsonPersona).subscribe(res=>{
        this.refreshPersonas.emit(true);
        this.close();
      });
    }
  }
  calcularEdad(){
    let fechaActual = moment();
    let fechaNac = moment(this.inputAlumno.fechaNac).format('YYYY-MM-DD');
    let age = moment.duration(fechaActual.diff(fechaNac));
    this.edad = "Edad: " + age.years() + " año(s) " + age.months() + " mes(es) ";
  }
}
