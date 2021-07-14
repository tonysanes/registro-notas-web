import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../persona.service';
import { Profesor } from '../../profesor';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-profesor',
  templateUrl: './manage-profesor.component.html',
  styleUrls: ['./manage-profesor.component.scss']
})
export class ManageProfesorComponent implements OnInit {
  @Input("isSelected") isSelected: boolean;
  @Input("profesor") profesor: Profesor;
  @Input("action") action: string;
  @Output("change") change: any =new EventEmitter();
  @Output() refreshProfesor = new EventEmitter();

  title:string;
  profesorForm: FormGroup;
  submitted: boolean=false;

  constructor(private fb: FormBuilder, private personaService:PersonaService) { }

  ngOnInit(): void {
    this.crearFormulario();
    if (this.action=="Editar") {
      this.title= "Editar Profesor";
      this.inicializarFormulario();
    } else {
      this.title= "Agregar Profesor";      
    }
  }
  
  goToProfesores(){
    this.isSelected= false;
    this.change.emit(this.isSelected);
  }

  crearFormulario(){ //Se usa para cualquier opcion
    this.profesorForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      genero: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      fechaNac: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

  }

  inicializarFormulario(){ //Se usa exclusivamente para la accion editar
    this.profesorForm.controls["nombres"].setValue(this.profesor.nombres);
    this.profesorForm.controls["apellidos"].setValue(this.profesor.apellidos);
    this.profesorForm.controls["dni"].setValue(this.profesor.dni);
    this.profesorForm.controls["genero"].setValue(this.profesor.genero);
    this.profesorForm.controls["telefono"].setValue(this.profesor.telefono);
    let fechaNac = moment(this.profesor.fechaNac).format('YYYY-MM-DD');
    this.profesorForm.controls["fechaNac"].setValue(fechaNac);
    this.profesorForm.controls["direccion"].setValue(this.profesor.direccion);
    this.profesorForm.controls["email"].setValue(this.profesor.email);
  }

  submitProfesor(){
    this.submitted = true;
    if (this.profesorForm.invalid) {
      return;
    }
    let jsonPersona=this.profesorForm.value;
    if (this.action== "Editar") {
      jsonPersona['id']= this.profesor.id;
      this.personaService.editarProfesor(jsonPersona).subscribe(
        res =>{
          this.refreshProfesor.emit();
          this.close();
        },
        error =>{
          console.log(error);
        }
      );
    }else{
      this.personaService.registrarProfesor(jsonPersona).subscribe(
        res =>{
          this.refreshProfesor.emit();
          this.close();
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

  close(){
    this.isSelected = false;
    this.change.emit(this.isSelected);
  }

}
