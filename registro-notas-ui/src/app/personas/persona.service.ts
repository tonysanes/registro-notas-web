import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona';
import { Profesor } from './profesor';

const URL_ALUMNO= "http://localhost:8080/api/alumnos";
const URL_PROFESOR= "http://localhost:8080/api/profesores";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient) { }

  cargarAlumnos() {
    return this.http.get<Persona[]>(URL_ALUMNO, { headers: this.headers });
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
