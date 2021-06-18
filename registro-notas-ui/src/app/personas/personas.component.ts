import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './persona.service';
import * as $ from 'jquery';
import { Persona } from './persona';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  alumnos: Persona[]=[];
  alumnoSelected: Persona;
  isSelected: boolean = false;

  constructor(private personasService:PersonaService, private router: Router) { }

  ngOnInit(): void {
    /* $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    }); */
    this.cargarAlumnos();
  }

  cargarAlumnos(){
    this.personasService.cargarAlumnos().subscribe(data=>{
      this.alumnos=data;
      console.log(this.alumnos);
     });
  }
  
  editarAlumno(alumno:Persona){
    this.isSelected = true;
      console.log(alumno);
      //this.router.navigate(['alumnos/edit', alumno.id]);
      this.alumnoSelected = alumno;
  }
  eliminarAlumno(id: number){
    console.log("eliminando Alumno", id);
  }
  reload() { 
    location.reload();       
  }
  goToHome(){
    this.router.navigate(['home']);
  }

}

