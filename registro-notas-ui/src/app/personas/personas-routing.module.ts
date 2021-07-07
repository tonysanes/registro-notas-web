import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativosComponent } from './administrativos/administrativos.component';
import { ManageAdministrativosComponent } from './administrativos/manage-administrativos/manage-administrativos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ManageAlumnoComponent } from './alumnos/manage-alumno/manage-alumno.component';
import { ManageProfesorComponent } from './profesores/manage-profesor/manage-profesor.component';
import { ProfesoresComponent } from './profesores/profesores.component';

const routes: Routes = [
  {
    path:"alumnos",
    component: AlumnosComponent
  },
  {
    path:"alumno/edit",
    component: ManageAlumnoComponent
  },
  {
    path:"profesores",
    component: ProfesoresComponent
  },
  {
    path:"profesor/edit",
    component: ManageProfesorComponent
  },
  {
    path:"administrativos",
    component: AdministrativosComponent
  },
  {
    path:"administrativos/edit",
    component: ManageAdministrativosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
