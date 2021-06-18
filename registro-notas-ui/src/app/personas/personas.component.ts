import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './persona.service';
import * as $ from 'jquery';
import { Persona } from './persona';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {

  alumnos: Persona[]=[];
  alumnoSelected: Persona;
  isSelected: boolean = false;
  closeModal: string;
  action: string;

  constructor(private personasService:PersonaService, private router: Router, config: NgbModalConfig, private modalService: NgbModal) {
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
    this.action = "edit";
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
    this.action = "create";
    this.alumnoSelected= {} as Persona;
    console.log("Registrar nuevo Alumno");
  }

  deletedModal(content:any, id: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = res; //`Closed with: ${res}`;
      console.log(this.closeModal);
      if (this.closeModal=="Save") {
        this.eliminarAlumno(id);
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

}

