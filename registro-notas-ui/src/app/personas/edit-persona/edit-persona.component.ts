import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.scss']
})
export class EditPersonaComponent implements OnInit {
  idPersona: any;
  alumno:any;
  constructor(private route: ActivatedRoute, private personaService: PersonaService) { }

  ngOnInit() {
    this.idPersona = this.route.snapshot.paramMap.get('id');
    console.log(this.idPersona);
    this.loadPersonById();
  }

  loadPersonById(){
    this.personaService.cargarAlumno(this.idPersona).subscribe(data=>{
      this.alumno=data;
      console.log(this.alumno);
    });
  }

}
