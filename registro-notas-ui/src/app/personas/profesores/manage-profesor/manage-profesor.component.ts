import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../persona.service';
import { Profesor } from '../../profesor';
import * as moment from 'moment';
import { SharePersonDataService } from '../../share-person-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-profesor',
  templateUrl: './manage-profesor.component.html',
  styleUrls: ['./manage-profesor.component.scss']
})
export class ManageProfesorComponent implements OnInit {
  profesor: Profesor;
  isEditing: boolean = false;

  title = "Registrar"
  profesorForm: FormGroup;
  submitted: boolean=false;

  maxDate: string;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private personaService:PersonaService,
    private profesorService: SharePersonDataService
    ) { }

  ngOnInit(): void {
    this.calculateMaxDate();
    this.crearFormulario();

    this.isEditing = this.router.url.endsWith('edit');

    if (this.isEditing) {
      
      this.profesorService.getProfesor().subscribe(res => {
        this.profesor = res;
      });

      this.title= "Editar";
      this.inicializarFormulario();
    } 
  }
  calculateMaxDate(){
    let currentDate: number = new Date().getFullYear();
    this.maxDate = (currentDate-21) + "-12-31";
    console.log(this.maxDate);
  }
  
  goToProfesores(){
    this.close();
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
    jsonPersona['fechaNac']= new Date(this.profesorForm.controls["fechaNac"].value);
    if (this.isEditing) {
      jsonPersona['id']= this.profesor.id;
      this.personaService.editarProfesor(jsonPersona).subscribe(
        res =>{
          this.close();
        },
        error =>{
          console.log(error);
        }
      );
    }else{
      this.personaService.registrarProfesor(jsonPersona).subscribe(
        res =>{
          this.close();
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

  close(){
    this.router.navigate(['/personas/profesores']);
  }

}
