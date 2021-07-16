import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alumno } from './alumno';
import { Profesor } from './profesor';

@Injectable({
  providedIn: 'root'
})
export class SharePersonDataService {

  private alumnoSource = new BehaviorSubject<any>(null);
  currentAlumno = this.alumnoSource.asObservable();//get method

  private profesorSource = new BehaviorSubject<any>(null);

  constructor() { }

  changeAlumno(alumno: Alumno) { //set method
    this.alumnoSource.next(alumno);
  }

  //Profesor
  setProfesor(profesor: Profesor) { //set method
    this.profesorSource.next(profesor);
  }
  getProfesor(){
    return this.profesorSource.asObservable();//get method
  }

}
