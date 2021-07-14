import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alumno } from '../alumno';

@Injectable({
  providedIn: 'root'
})
export class SharePersonDataService {

  private alumnoSource = new BehaviorSubject<any>(null);
  currentAlumno = this.alumnoSource.asObservable();//get method

  constructor() { }

  changeAlumno(alumno: Alumno) { //set method
    this.alumnoSource.next(alumno);
  }

}
