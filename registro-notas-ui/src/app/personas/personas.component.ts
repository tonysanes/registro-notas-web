import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './persona.service';
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
  isLoading: boolean = false;

  //Pagination
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  alumnos2: Persona[]=[];

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

  deletedModal(content:any, alumno: Persona) {
    this.confirmationQuestion = "¿Estas seguro eliminar el Alumno(a) " + alumno.nombres + "?";
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = res;
      console.log(this.closeModal);
      if (this.closeModal=="Save") {
        this.eliminarAlumno(alumno.id as number);
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

