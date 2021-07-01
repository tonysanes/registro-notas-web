import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ManageAlumnoComponent } from './alumnos/manage-alumno/manage-alumno.component';

const routes: Routes = [
  {
    path:"",
    component: AlumnosComponent
  },
  {
    path:"edit",
    component: ManageAlumnoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
