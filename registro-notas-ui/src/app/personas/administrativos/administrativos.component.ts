import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ConfirmModalComponent } from 'src/app/core/confirm-modal/confirm-modal.component';
import { Alumno } from '../alumno';
import { CsvDataService } from '../csv-data.service';
import { PersonaService } from '../persona.service';
import { SharePersonDataService } from './share-person-data.service';

@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.component.html',
  styleUrls: ['./administrativos.component.scss']
})
export class AdministrativosComponent implements OnInit {
  columns: string[] = ["Nombres", "Apellidos", "Telefono", "Nivel", "Grado", "Seccion", "Direccion", "Email"];
  alumnos: Alumno[] = [];
  currentAlumno?: Alumno;
  currentIndex = -1;
  nombre = '';

  //For autosuggest
  autosuggests: any[] =[ ];
  selectedValue: string = "";  
  selectedOption: any;

  page = 1; // number
  currentPage = 0;
  pages = 0; // TotalPages
  count = 0; // TotalElements
  pageSize = 10; // size
  pageSizes = [10, 25, 50, 100];

  //my
  sortKey : string = "fechaModificacion";
  sortDirection : string = "DESC";
  sorts : any[] = [];
  filters : any[] = [];

  isOpened = false;

  constructor(
    private personaService: PersonaService, 
    private router : Router, 
    private csvService: CsvDataService,
    private modalService: NgbModal,
    private alumnoService: SharePersonDataService ) 
    { 

    }

  ngOnInit(): void {
    this.getAlumonosAutosuggest();
    this.retrieveAlumnos();
    this.currentPage = this.page;
  }

  getAlumonosAutosuggest(){
    this.personaService.cargarAlumnosAutosuggest().subscribe(
      res =>{
        this.autosuggests = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect(event: TypeaheadMatch): void {  
    this.selectedOption = event.item;
    console.log(this.selectedOption);
    this.nombre = this.selectedOption.nombres;
    this.searchAlumno();
  } 

  retrieveAlumnos(){
    this.sorts = [{key: this.sortKey, criteria: this.sortDirection}];
    const encodedSorts = this.sorts.length == 0 ? '' : encodeURIComponent(JSON.stringify(this.sorts));
    const encodedFilters = this.filters.length == 0 ? '' : encodeURIComponent(JSON.stringify(this.filters));
    this.personaService.loadAlumnos(encodedFilters, encodedSorts, this.page, this.pageSize).subscribe(
      response => {
        this.alumnos = response.content;
        this.count = response.totalElements;
        this.pages = response.totalPages
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.currentPage = event;
    this.retrieveAlumnos();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAlumnos();
  }

  refreshList(): void {
    this.retrieveAlumnos();
    this.currentAlumno = undefined;
    this.currentIndex = -1;
  }

  setActiveAlumno(alumno: Alumno, index: number): void {
    this.currentAlumno = alumno;
    this.currentIndex = index;
  }

  searchAlumno(): void {
    if(this.nombre != ""){
      this.page = 1;
      this.currentPage = this.page;
      this.filters = [{ key:"nombres", value1 : this.nombre, value2 :"", operation : "EQUAL" }];
    } else {
      this.filters = [];
    }
    this.retrieveAlumnos();
  }

  sortColumn(col: string) {
    this.sortKey = col;
    this.retrieveAlumnos();
    if(this.sortDirection == "DESC"){
      this.sortDirection = "ASC";
    } else {
      this.sortDirection = "DESC";
    }
  }

  goToPage(){
    this.page = this.currentPage ;
    this.retrieveAlumnos();
  }

  editarAlumno(alumno: Alumno){
    //this.alumnoService.changeAlumno(alumno);//Seteando un alumno al shareDataAlumno service
    console.log("alumno desde primer componet: ", alumno);
    this.router.navigate(['personas/administrativos/edit']);
    this.isOpened = true;
  }
  closeSidebar(){
    this.isOpened = false;
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  reload(){
    //location.reload(); 
    console.log("Refresh table");
    this.page = 1;
    this.currentPage = 1;
    this.sortKey = "fechaModificacion";
    this.sortDirection = "DESC";
    this.filters = [];
    this.selectedValue = "";
    this.retrieveAlumnos();
  }
  addAlumno(){

  }
  exportCsv(){
    this.csvService.exportToCsv('alumnos1.csv', this.alumnos);
  }

  clearSearch(){
    this.selectedValue = "";
    this.filters = [];
    this.retrieveAlumnos();
  }

  openDeleteModal(alumno: Alumno) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = "¿Estas seguro de eliminar el Alumno(a) " + alumno.nombres + "?";
    modalRef.componentInstance.action.subscribe((action: string) => {
      if (action == "save") {
        this.eliminarAlumno(alumno.id as number);
      }
    });
  }

  eliminarAlumno(id: number){
    this.personaService.eliminarAlumno(id).subscribe( (data: any)=>{
      this.getAlumonosAutosuggest();
      this.reload();
    });
  }
  
}