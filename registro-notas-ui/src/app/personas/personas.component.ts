import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './persona.service';
import * as $ from 'jquery';
import { Persona } from './persona';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CsvDataService } from './csv-data.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  columns: string[] = ["Nombres", "Apellidos", "Telefono", "Nivel", "Grado", "Seccion", "Direccion", "Email"];
  alumnos: Persona[]=[];
  alumnoSelected: Persona;
  isSelected: boolean = false;
  closeModal: string;
  action: string;
  confirmationQuestion: string;

  constructor(private personasService:PersonaService, private router: Router, config: NgbModalConfig, private modalService: NgbModal, private csvService: CsvDataService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

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
    this.action = "Editar";
    this.isSelected = true;
    this.alumnoSelected = alumno;
  }
  eliminarAlumno(id: number){
    this.personasService.eliminarAlumno(id).subscribe(data=>{
      console.log("Se elimino correctamente");
      this.reload();
    });
  }
  reload() { 
    location.reload();       
  }
  goToHome(){
    this.router.navigate(['home']);
  }

  addPersona(){
    this.isSelected=true;
    this.action = "Registrar";
    this.alumnoSelected= {} as Persona;
    console.log("Registrar nuevo Alumno");
  }

  deletedModal(content:any, alumno: Persona) {
    this.confirmationQuestion = "¿Estas seguro eliminar el Alumno(a) " + alumno.nombres + "?";
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = res; //`Closed with: ${res}`;
      console.log(this.closeModal);
      if (this.closeModal=="Save") {
        this.eliminarAlumno(alumno.id);
      }
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  exportCsv(){
    console.log("Export csv");
    this.csvService.exportToCsv('alumnos.csv', this.alumnos);
  }

}

