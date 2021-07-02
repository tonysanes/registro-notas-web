import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsvDataService } from '../csv-data.service';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { Profesor } from '../profesor';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  columns: string[] = ["Nombres", "Apellidos", "Dni", "Direccion", "Telefono", "Email"];
  profesores: Profesor[]=[];
  profesorSelected: Profesor;
  isSelected: boolean = false;
  clseModal: string;
  action: string;
  confirmationQuestion: string;
  isLoading: boolean = false;

  constructor(private personaService: PersonaService, private router: Router, private csvService: CsvDataService) { }

  ngOnInit(): void {
    this.cargarProfesores();
  }
  cargarProfesores(){
    this.personaService.cargarProfesor().subscribe(res=>{
      this.profesores=res;
    });
  }

  exportCsv(){
    this.csvService.exportToCsv('profesores.csv', this.profesores);
  }
  addProfesor(){
    this.isSelected=true;
  }
  reload(){
    location.reload();
  }
  goToHome(){
    this.router.navigate(['home']);
  }
}