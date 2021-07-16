import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ConfirmModalComponent } from 'src/app/core/confirm-modal/confirm-modal.component';
import { Alumno } from '../alumno';
import { CsvDataService } from '../csv-data.service';
import { PersonaService } from '../persona.service';
import { SharePersonDataService } from '../share-person-data.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  columns: string[] = ["Nombres", "Apellidos", "Telefono", "Nivel", "Grado", "Seccion", "Genero", "Direccion", "Email"];
  alumnos: Alumno[] = [];
  currentAlumno?: Alumno;
  currentIndex = -1;
  nombre = '';

  title = "Alumnos";
  isLoading = false;

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
  sortKey : string = "fechaModificacion";
  sortDirection : string = "DESC";
  sorts : any[] = [];
  filters : any[] = [];
  itemsAsObjects : any[] = [];

  isOpened = false;

  constructor(
    private personaService: PersonaService, 
    private router : Router, 
    private csvService: CsvDataService,
    private modalService: NgbModal,
    private alumnoService: SharePersonDataService ) { }

  ngOnInit(): void {
    this.getAlumonosAutosuggest();
    this.retrieveAlumnos();
    this.currentPage = this.page;
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

  //To apply new filters from Filter form (submit button)
  editFilters(event: any[]){
    this.filters = [];
    this.itemsAsObjects = [];
    this.itemsAsObjects = event;
    this.getFiltersDisplay();
    this.retrieveAlumnos();
  }

  //To remove an filter from the chip list
  onItemRemoved(event: any){
    this.filters = [];
    const index: number = this.itemsAsObjects.indexOf(event);
    if (index !== -1) {
      this.itemsAsObjects.splice(index, 1);
    }
    this.retrieveAlumnos();
  }

  //To remove all the filters from the chip list
  removeAllFilters(){
    this.filters = [];
    this.itemsAsObjects = [];
    this.retrieveAlumnos();
  }

  //To populate the autosuggest in the search input
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

  //To select an item from the autosuggest list
  onSelect(event: TypeaheadMatch): void {  
    this.selectedOption = event.item;
    this.nombre = this.selectedOption.nombres;
    this.searchAlumno();
  } 
  
  //To populate the alumnos table
  retrieveAlumnos(){
    this.isLoading = true;
    this.getFiltersDisplay();
    this.sorts = [{key: this.sortKey, criteria: this.sortDirection}];
    const encodedSorts = this.sorts.length == 0 ? '' : encodeURIComponent(JSON.stringify(this.sorts));
    const encodedFilters = this.filters.length == 0 ? '' : encodeURIComponent(JSON.stringify(this.filters));
    this.personaService.loadAlumnos(encodedFilters, encodedSorts, this.page, this.pageSize).subscribe(
      response => {
        this.alumnos = response.content;
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

  //To selec a page from the pagination component
  handlePageChange(event: number): void {
    this.page = event;
    this.currentPage = event;
    this.retrieveAlumnos();
  }

  //To change the page size
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAlumnos();
  }

  //To refresh the alumno table
  refreshList(): void {
    this.retrieveAlumnos();
    this.currentAlumno = undefined;
    this.currentIndex = -1;
  }

  //To select an alumno from the table
  setActiveAlumno(alumno: Alumno, index: number): void {
    this.currentAlumno = alumno;
    this.currentIndex = index;
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
    this.retrieveAlumnos();
  }

  //To sort a column in ASC and DESC direction
  sortColumn(col: string) {
    this.sortKey = col;
    this.retrieveAlumnos();
    if(this.sortDirection == "DESC"){
      this.sortDirection = "ASC";
    } else {
      this.sortDirection = "DESC";
    }
  }

  //To go to an especific page entered in the input
  goToPage(){
    this.page = this.currentPage ;
    this.retrieveAlumnos();
  }

  //To lands to the manage-alumno page with action = register
  addAlumno(){
    this.router.navigate(['personas/alumnos/create']);
  }

  //To lands to the manage-alumno component with action = edit
  editarAlumno(alumno: Alumno){
    this.alumnoService.changeAlumno(alumno);//Seteando un alumno al shareDataAlumno service
    this.router.navigate(['personas/alumnos/edit']);
    this.isOpened = true;
  }

  //To open a confirmation modal for the delete alumno action
  openDeleteModal(alumno: Alumno) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = "¿Estas seguro de eliminar el Alumno(a) " + alumno.nombres + "?";
    modalRef.componentInstance.action.subscribe((action: string) => {
      if (action == "save") {
        this.eliminarAlumno(alumno.id as number);
      }
    });
  }

  //To delete an alumno by id
  eliminarAlumno(id: number){
    this.personaService.eliminarAlumno(id).subscribe( (data: any)=>{
      this.getAlumonosAutosuggest();
      this.reload();
    });
  }

  //To open the filters sidebar component
  openFilter(){
    this.isOpened = true;
  }

  //To close the filters sidebar
  closeSidebar(event: boolean){
    this.isOpened = false;
  }

  //To go home page
  goToHome(){
    this.router.navigate(['home']);
  }

  //To Refresh the alumnos table
  reload(){
    this.page = 1;
    this.currentPage = 1;
    this.sortKey = "fechaModificacion";
    this.sortDirection = "DESC";
    this.filters = [];
    this.selectedValue = "";
    this.retrieveAlumnos();
  }
  
  //To export the alumnos table into a csv file
  exportCsv(){
    this.csvService.exportToCsv('alumnos.csv', this.alumnos);
  }

  //To clear the search input
  clearSearch(){
    this.selectedValue = "";
    this.filters = [];
    this.retrieveAlumnos();
  }

}