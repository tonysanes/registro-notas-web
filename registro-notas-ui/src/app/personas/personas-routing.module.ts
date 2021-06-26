import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './personas.component';
import { ManagePersonaComponent } from './manage-persona/manage-persona.component';

const routes: Routes = [
  {
    path:"",
    component: PersonasComponent
  },
  {
    path:"edit",
    component: ManagePersonaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
