import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from './alumno';
import { Profesor } from './profesor';

const URL_ALUMNO= "http://localhost:8080/api/alumnos";
const URL_PROFESOR= "http://localhost:8080/api/profesores";
const SEPARATOR = "/";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private headers = new HttpHeaders({
    'Content-Type':'application/json'
  });
  private headersEncoded = new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded'
  });

  constructor(private http: HttpClient) { }

  //service alumnos
  cargarAlumnosAutosuggest() {
    return this.http.get<any[]>(URL_ALUMNO+"/autosuggets", { headers: this.headers });
  }

  cargarAlumnos() {
    return this.http.get<Alumno[]>(URL_ALUMNO, { headers: this.headers });
  }

  public loadAlumnos(filters: string, sorts: string, page: number, size: number) : Observable<any>{
    if(filters != '' && sorts != '') {
      return this.http.get<any>(URL_ALUMNO + '?filters=' + filters + '&sort=' + sorts + '&page=' + page + '&size=' + size, { headers: this.headersEncoded });
    } else if(filters != '' && sorts == '') {
      return this.http.get<any>(URL_ALUMNO + '?filters=' + filters + '&page=' + page + '&size=' + size, { headers: this.headersEncoded });
    } else if(filters == '' && sorts != '') {
      return this.http.get<any>(URL_ALUMNO + '?sort=' + sorts + '&page=' + page + '&size=' + size, { headers: this.headersEncoded });
    } else {
      return this.http.get<any>(URL_ALUMNO + '?page=' + page + '&size=' + size, { headers: this.headersEncoded });
    }
  }

  cargarAlumno(id: number){
    return this.http.get<Alumno>(URL_ALUMNO+"/"+id, { headers: this.headers });
  }

  editarAlumno(alumno: Alumno){
    return this.http.put<Alumno>(URL_ALUMNO, alumno, { headers: this.headers });
  }

  registrarAlumno(alumno: Alumno){
    return this.http.post<Alumno>(URL_ALUMNO, alumno, { headers: this.headers });
  }

  eliminarAlumno(id: number){
    return this.http.delete<Alumno>(URL_ALUMNO+"/"+id, { headers: this.headers });
  }

  //service profesores
  public loadProfesores(filters: string, sorts: string, page: number, size: number) : Observable<any>{
    if(filters != '' && sorts != '') {
      return this.http.get<any>(URL_PROFESOR + '?filters=' + filters + '&sort=' + sorts + '&page=' + page + '&size=' + size, { headers: this.headersEncoded });
    } else if(filters != '' && sorts == '') {
      return this.http.get<any>(URL_PROFESOR + '?filters=' + filters + '&page=' + page + '&size=' + size, { headers: this.headersEncoded });
    } else if(filters == '' && sorts != '') {
      return this.http.get<any>(URL_PROFESOR + '?sort=' + sorts + '&page=' + page + '&size=' + size, { headers: this.headersEncoded });
    } else {
      return this.http.get<any>(URL_PROFESOR + '?page=' + page + '&size=' + size, { headers: this.headersEncoded });
    }
  }

  cargarProfesoresAutosuggest() {
    return this.http.get<any[]>(URL_PROFESOR+"/autosuggets", { headers: this.headers });
  }

  cargarProfesor() {
    return this.http.get<Profesor[]>(URL_PROFESOR, { headers: this.headers });
  }

  eliminarProfesor(id: number){
    return this.http.delete<Profesor>(URL_PROFESOR+"/"+id, { headers: this.headers });
  }

  editarProfesor(profesor: Profesor){
    return this.http.put<Profesor>(URL_PROFESOR, profesor, { headers: this.headers });
  }

  registrarProfesor(profesor: Profesor){
    return this.http.post<Profesor>(URL_PROFESOR, profesor, { headers: this.headers });
  }
}
