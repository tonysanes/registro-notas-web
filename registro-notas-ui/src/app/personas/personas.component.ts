import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './persona.service';
import { Persona } from './persona';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CsvDataService } from './csv-data.service';
import { ConfirmModalComponent } from '../core/confirm-modal/confirm-modal.component';
import { SortEvent, SortHeaderDirective } from '../core/directives/sort-header.directive';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
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
  isLoading: boolean = false;

  //Pagination
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  alumnos2: Persona[]=[];


  @ViewChildren(SortHeaderDirective) headers: QueryList<SortHeaderDirective>;

  constructor(private personasService:PersonaService, private router: Router, config: NgbModalConfig, private modalService: NgbModal, private csvService: CsvDataService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
    this.isLoading = true;
    this.cargarAlumnos();
    setTimeout(() => {
      this.refreshAlumnos();
      this.isLoading = false;
    }, 2000);
  }

  cargarAlumnos(){
    this.personasService.cargarAlumnos().subscribe(data=>{
      this.alumnos=data;
      this.collectionSize = this.alumnos.length;
     });
  }

  refreshAlumnos() {
    this.alumnos2 = this.alumnos.map((alumno, i) => ({id: i+1, ...alumno})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  
  editarAlumno(alumno:Persona){
    this.action = "Editar";
    this.isSelected = true;
    this.alumnoSelected = alumno;
  }
  eliminarAlumno(id: number){
    this.personasService.eliminarAlumno(id).subscribe(data=>{
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
  }

  exportCsv(){
    this.csvService.exportToCsv('alumnos.csv', this.alumnos);
  }

  openDeleteModal(alumno: Persona) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = "¿Estas seguro de eliminar el Alumno(a) " + alumno.nombres + "?";
    modalRef.componentInstance.action.subscribe((action: string) => {
      if (action == "save") {
        this.eliminarAlumno(alumno.id as number);
      }
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.alumnos2 = this.alumnos;
    } else {
      this.alumnos2 = [...this.alumnos].sort((a:any, b:any) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}

