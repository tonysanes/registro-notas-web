import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/core/confirm-modal/confirm-modal.component';
import { SharePersonDataService } from '../share-person-data.service';
import { CsvDataService } from '../csv-data.service';
import { PersonaService } from '../persona.service';
import { Profesor } from '../profesor';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  columns: string[] = ["Nombres", "Apellidos", "DNI", "Genero", "Direccion", "Telefono", "Fecha Nacimiento", "Email"];
  profesores: Profesor[]=[];
  currentProfesor?: Profesor;
  currentIndex = -1;
  nombre = '';

  confirmationQuestion: string;
  isLoading: boolean = false;
  title = "Profesores";

  //Autosuggest variables
  autosuggests: any[] =[ ];
  selectedValue: string = "";  
  selectedOption: any;

  //Pagination variables
  page = 1; // number
  currentPage = 0;
  pages = 0; // TotalPages
  count = 0; // TotalElements
  pageSize = 10; // size
  pageSizes = [10, 25, 50, 100];

  //Filters and Sorts variables
  sortKey : string = "fechaMod";
  sortDirection : string = "DESC";
  sorts : any[] = [];
  filters : any[] = [];
  itemsAsObjects : any[] = [];

  isOpened = false;

  constructor(
    private personaService: PersonaService, 
    private router: Router, 
    private csvService: CsvDataService, 
    private modalService: NgbModal,
    private alumnoService: SharePersonDataService
    ) { }

  ngOnInit(): void {
    this.getProfesoresAutosuggest();
    this.retrieveProfesores();
    this.currentPage = this.page;
  }

  //To populate the autosuggest in the search input
  getProfesoresAutosuggest(){
    this.personaService.cargarProfesoresAutosuggest().subscribe(
      res =>{
        this.autosuggests = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  //To select an item from the autosuggest list
  onSelect(event: TypeaheadMatch): void {  
    this.selectedOption = event.item;
    this.nombre = this.selectedOption.nombres;
    this.searchAlumno();
  } 

  //To search an alumno by nombres
  searchAlumno(): void {
    if(this.nombre != ""){
      this.page = 1;
      this.currentPage = this.page;
      this.filters = [{ key:"nombres", value1 : this.nombre, value2 :"", operation : "EQUAL" }];
    } else {
      this.filters = [];
    }
    this.retrieveProfesores();
  }

  //To populate the profesores table
  retrieveProfesores(){
    this.isLoading = true;
    this.getFiltersDisplay();
    this.sorts = [{key: this.sortKey, criteria: this.sortDirection}];
    const encodedSorts = this.sorts.length == 0 ? '' : encodeURIComponent(JSON.stringify(this.sorts));
    const encodedFilters = this.filters.length == 0 ? '' : encodeURIComponent(JSON.stringify(this.filters));
    this.personaService.loadProfesores(encodedFilters, encodedSorts, this.page, this.pageSize).subscribe(
      response => {
        this.profesores = response.content;
        this.count = response.totalElements;
        this.pages = response.totalPages;
        setTimeout(() => { // TODO remove setTimeout, it is just to test
          this.isLoading = false;
        }, 500);
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  //To get filter objects from itemsAsObjects array
  getFiltersDisplay(){
    this.itemsAsObjects.forEach(element => {
      this.filters.push({
        key: element.key,
        value1: element.value1,
        value2: element.value2,
        operation: element.operation,
      });
    });
  }

  //To sort a column in ASC and DESC direction
  sortColumn(col: string) {
    this.sortKey = col;
    this.retrieveProfesores();
    if(this.sortDirection == "DESC"){
      this.sortDirection = "ASC";
    } else {
      this.sortDirection = "DESC";
    }
  }

  //To select an profesor from the table
  setActiveProfesor(profesor: Profesor, index: number): void {
    this.currentProfesor = profesor;
    this.currentIndex = index;
  }

  //To change the page size
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProfesores();
  }

  //To selec a page from the pagination component
  handlePageChange(event: number): void {
    this.page = event;
    this.currentPage = event;
    this.retrieveProfesores();
  }

  //To go to an especific page entered in the input
  goToPage(){
    this.page = this.currentPage ;
    this.retrieveProfesores();
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
    this.router.navigate(['personas/profesores/create']);
  }

  //To Refresh the alumnos table
  reload(){
    this.page = 1;
    this.currentPage = 1;
    this.sortKey = "fechaMod";
    this.sortDirection = "DESC";
    this.filters = [];
    this.selectedValue = "";
    this.retrieveProfesores();
  }

  //To clear the search input
  clearSearch(){
    this.selectedValue = "";
    this.filters = [];
    this.retrieveProfesores();
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
    this.alumnoService.setProfesor(profesor);
    this.router.navigate(["personas/profesores/edit"]);
  }

  //To open the filters sidebar component
  openFilter(){
    this.isOpened = true;
  }

  //To close the filters sidebar
  closeSidebar(event: boolean){
    this.isOpened = false;
  }

  //To apply new filters from Filter form (submit button)
  editFilters(event: any[]){
    this.filters = [];
    this.itemsAsObjects = [];
    this.itemsAsObjects = event;
    this.retrieveProfesores();
  }

  //To remove an filter from the chip list
  onItemRemoved(event: any){
    this.filters = [];
    const index: number = this.itemsAsObjects.indexOf(event);
    if (index !== -1) {
      this.itemsAsObjects.splice(index, 1);
    }
    this.retrieveProfesores();
  }

  //To remove all the filters from the chip list
  removeAllFilters(){
    this.filters = [];
    this.itemsAsObjects = [];
    this.retrieveProfesores();
  }
}
