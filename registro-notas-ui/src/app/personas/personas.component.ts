import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  alumnos: any[]=[];
  constructor(private personasService:PersonaService, private router: Router) { }

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
      this.router.navigate(['alumnos/edit', alumno.id]);
  }

}

