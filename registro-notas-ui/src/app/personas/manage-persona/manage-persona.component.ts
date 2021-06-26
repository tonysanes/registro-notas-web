import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../persona.service';
import * as moment from 'moment';
import { Persona } from '../persona';

@Component({
  selector: 'app-manage-persona',
  templateUrl: './manage-persona.component.html',
  styleUrls: ['./manage-persona.component.scss']
})
export class ManagePersonaComponent implements OnInit {
  //Parametro de entrada alumo object
  @Input() inputAlumno: Persona;
  @Input() action: string;
  @Output() refreshPersonas = new EventEmitter();

  //Parametro de entrada y salida: flag
  @Input() showEditForm: any;
  @Output() showEditFormChange = new EventEmitter();
  personasForm: FormGroup;
  title: string;
  submitted = false;
  
  constructor( public fb: FormBuilder, public datepipe: DatePipe, private personaService: PersonaService) { }

  ngOnInit() {
    console.log(this.inputAlumno);
    console.log(this.action);
    this.crearFormulario();
    if (this.action=="Editar") {
      this.title="Editar Alumno";
      this.inicializarFormulario();
    }else{
      this.title="Registrar Alumno";
    }

  }

  crearFormulario(){
    this.personasForm = this.fb.group({
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
    this.personasForm.controls["nombres"].setValue(this.inputAlumno.nombres);
    this.personasForm.controls["apellidos"].setValue(this.inputAlumno.apellidos);
    this.personasForm.controls["email"].setValue(this.inputAlumno.email);
    this.personasForm.controls["telefono"].setValue(this.inputAlumno.telefono);
    this.personasForm.controls["nivel"].setValue(this.inputAlumno.nivel);
    this.personasForm.controls["grado"].setValue(this.inputAlumno.grado);
    this.personasForm.controls["seccion"].setValue(this.inputAlumno.seccion);
    this.personasForm.controls["direccion"].setValue(this.inputAlumno.direccion);
    let fechaNac = moment(this.inputAlumno.fechaNac).format('YYYY-MM-DD');
    this.personasForm.controls["fechaNacimiento"].setValue(fechaNac);
  }

  close(){
    this.showEditForm = false;
    this.showEditFormChange.emit(this.showEditForm);
  }

  updatePersona(){
    this.submitted = true;
    if (this.personasForm.invalid) {
      return;
    }
    let jsonPersona=this.personasForm.value;
    jsonPersona['fechaNac']= new Date(this.personasForm.controls["fechaNacimiento"].value);
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
}
