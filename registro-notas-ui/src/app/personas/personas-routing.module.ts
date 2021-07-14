import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ManageAlumnoComponent } from './alumnos/manage-alumno/manage-alumno.component';
import { ManageProfesorComponent } from './profesores/manage-profesor/manage-profesor.component';
import { ProfesoresComponent } from './profesores/profesores.component';

const routes: Routes = [
  
  {
    path:"profesores",
    component: ProfesoresComponent
  },
  {
    path:"profesor/edit",
    component: ManageProfesorComponent
  },
  {
    path:"alumnos",
    component: AlumnosComponent
  },
  {
    path:"alumnos/edit",
    component: ManageAlumnoComponent
  },
  {
    path:"alumnos/create",
    component: ManageAlumnoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
