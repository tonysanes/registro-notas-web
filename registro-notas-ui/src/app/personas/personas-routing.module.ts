import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativosComponent } from './administrativos/administrativos.component';
import { ManageAdministrativosComponent } from './administrativos/manage-administrativos/manage-administrativos.component';
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
    component: AdministrativosComponent
  },
  {
    path:"alumnos/edit",
    component: ManageAdministrativosComponent
  },
  {
    path:"alumnos/create",
    component: ManageAdministrativosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
