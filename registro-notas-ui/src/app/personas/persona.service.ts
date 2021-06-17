import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient) { }

  cargarAlumnos() {
    return this.http.get<Persona[]>("http://localhost:8080/api/alumnos", { headers: this.headers });
   }

  cargarAlumno(id: number){
    return this.http.get<Persona>("http://localhost:8080/api/alumnos/"+id, { headers: this.headers });
  }

  editarAlumno(persona: Persona){
    return this.http.put<Persona>("http://localhost:8080/api/alumnos", persona, { headers: this.headers });
  }
}
