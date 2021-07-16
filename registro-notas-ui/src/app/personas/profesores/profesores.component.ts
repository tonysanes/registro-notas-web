import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/core/confirm-modal/confirm-modal.component';
import { SharePersonDataService } from '../share-person-data.service';
import { CsvDataService } from '../csv-data.service';
import { PersonaService } from '../persona.service';
import { Profesor } from '../profesor';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  columns: string[] = ["Nombres", "Apellidos", "Dni", "Genero", "Direccion", "Telefono", "Fecha Nacimiento", "Email"];
  profesores: Profesor[]=[];
  profesorSelected: Profesor;
  isSelected: boolean = false;
  clseModal: string;
  action: string;
  confirmationQuestion: string;
  isLoading: boolean = false;
  title = "Profesores";

  constructor(
    private personaService: PersonaService, 
    private router: Router, 
    private csvService: CsvDataService, 
    private modalService: NgbModal,
    private alumnoService: SharePersonDataService
    ) { }

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
    this.action = "Agregar";
    this.router.navigate(['personas/profesores/create']);
  }
  closeAddProfesor(event: boolean){
    this.isSelected=event;
  }

  reload(){
    location.reload();
  }
  goToHome(){
    this.router.navigate(['home']);
  }

  eliminarProfesor(id: number){
    this.personaService.eliminarProfesor(id).subscribe(res=>{
      this.reload();
    });
  }

  openDeleteModal(profesor: Profesor) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = "¿Estas seguro de eliminar el Profesor(a) " + profesor.nombres + "?";
    modalRef.componentInstance.action.subscribe((action: string) => {
      if (action == "save") {
        this.eliminarProfesor(profesor.id as number);
      }
    });
  }
  editarProfesor(profesor: Profesor){
    this.action = "Editar";
    this.isSelected = true;
    this.profesorSelected = profesor;

    this.alumnoService.setProfesor(profesor);
    this.router.navigate(["personas/profesores/edit"]);
  }
}
