import { Component, OnInit } from '@angular/core';
import { PersonaService } from './persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  alumnos: any[]=[];
  constructor(private personasService:PersonaService) { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(){
    this.personasService.cargarAlumnos().subscribe(data=>{
      this.alumnos=data;
      console.log(this.alumnos);
     });
  }
  
  editarAlumno(alumno:any){
      console.log(alumno);
  }

}

