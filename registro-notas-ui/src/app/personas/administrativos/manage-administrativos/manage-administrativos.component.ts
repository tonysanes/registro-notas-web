import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../alumno';
import { SharePersonDataService } from '../share-person-data.service';

@Component({
  selector: 'app-manage-administrativos',
  templateUrl: './manage-administrativos.component.html',
  styleUrls: ['./manage-administrativos.component.scss']
})
export class ManageAdministrativosComponent implements OnInit {

  currentAlumno: Alumno;
  isEditing: boolean = false;

  constructor(private alumnoService: SharePersonDataService) { }

  ngOnInit(): void {
    this.getAlumnoFromService();
  }
  
  getAlumnoFromService(){
    this.alumnoService.currentAlumno.subscribe(res => {
      this.currentAlumno = res;
      if(this.currentAlumno != null){
        this.isEditing = true;
      } else {
        this.isEditing = false;
      }
      console.log("Alumno desde segundo component: ", this.currentAlumno);
    });
  }

}
