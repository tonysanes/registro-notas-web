import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.scss']
})
export class EditPersonaComponent implements OnInit {
  //Parametro de entrada alumo object
  @Input() inputAlumno: any;

  //Parametro de entrada y salida: flag
  @Input() showEditForm: any;
  @Output() showEditFormChange = new EventEmitter();
  personasForm: FormGroup;
  constructor( public fb: FormBuilder, public datepipe: DatePipe) { }

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
    let nacimiento =this.datepipe.transform(this.inputAlumno.fechaNac, 'yyyy-MM-dd');
    this.personasForm.controls["fechaNacimiento"].setValue(nacimiento);
  }

  close(){
    this.showEditForm = false;
    this.showEditFormChange.emit(this.showEditForm);
  }

  updatePerson(){
    
  }
}
