import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../persona.service';
import * as moment from 'moment';
import { Persona } from '../persona';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.scss']
})
export class EditPersonaComponent implements OnInit {
  //Parametro de entrada alumo object
  @Input() inputAlumno: Persona;
  @Output() refreshPersonas = new EventEmitter();

  //Parametro de entrada y salida: flag
  @Input() showEditForm: any;
  @Output() showEditFormChange = new EventEmitter();
  personasForm: FormGroup;
  constructor( public fb: FormBuilder, public datepipe: DatePipe, private personaService: PersonaService) { }

  ngOnInit() {
    console.log(this.inputAlumno);
    this.crearFormulario();
    this.inicializarFormulario();

  }

  crearFormulario(){
    this.personasForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
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
    let jsonPersona=this.personasForm.value;
    jsonPersona['fechaNac']= new Date(this.personasForm.controls["fechaNacimiento"].value);
    jsonPersona['id']=this.inputAlumno.id;
    this.personaService.editarAlumno(jsonPersona).subscribe(res=>{
      this.refreshPersonas.emit(true);
      this.close();
    });
  }
}
