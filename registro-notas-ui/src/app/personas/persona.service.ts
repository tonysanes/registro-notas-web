import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from './persona';
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

  cargarAlumnosAutosuggest() {
    return this.http.get<any[]>(URL_ALUMNO+"/autosuggets", { headers: this.headers });
  }


  cargarAlumnos() {
    return this.http.get<Persona[]>(URL_ALUMNO, { headers: this.headers });
  }

  public loadAlumnos(filters: string, sorts: string, page: number, size: number) : Observable<any>{
    if(filters != '' && sorts != '') {
      return this.http.get<any>(URL_ALUMNO + SEPARATOR + filters + SEPARATOR + sorts + SEPARATOR + page + SEPARATOR + size, { headers: this.headersEncoded });
    } else if(filters != '' && sorts == '') {
      return this.http.get<any>(URL_ALUMNO + SEPARATOR + filters + SEPARATOR + page + SEPARATOR + size, { headers: this.headersEncoded });
    } else if(filters == '' && sorts != '') {
      return this.http.get<any>(URL_ALUMNO + SEPARATOR + sorts + SEPARATOR + page + SEPARATOR + size, { headers: this.headersEncoded });
    } else {
      return this.http.get<any>(URL_ALUMNO + SEPARATOR + page + SEPARATOR + size, { headers: this.headersEncoded });
    }
  }

  cargarAlumno(id: number){
    return this.http.get<Persona>(URL_ALUMNO+"/"+id, { headers: this.headers });
  }

  editarAlumno(persona: Persona){
    return this.http.put<Persona>(URL_ALUMNO, persona, { headers: this.headers });
  }

  registrarAlumno(persona: Persona){
    return this.http.post<Persona>(URL_ALUMNO, persona, { headers: this.headers });
  }

  eliminarAlumno(id: number){
    return this.http.delete<Persona>(URL_ALUMNO+"/"+id, { headers: this.headers });
  }

  //service profesor
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
