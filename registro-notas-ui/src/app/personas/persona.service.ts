import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona';

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
}
