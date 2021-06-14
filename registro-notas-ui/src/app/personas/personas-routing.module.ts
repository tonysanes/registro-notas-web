import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasModule } from './personas.module';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './personas.component';
import { EditPersonaComponent } from './edit-persona/edit-persona.component';

const routes: Routes = [
  {
    path:"",
    component: PersonasComponent
  },
  {
    path:"edit",
    component: EditPersonaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
