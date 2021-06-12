import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPersonaComponent } from './edit-persona/edit-persona.component';
import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas.component';

@NgModule({
  declarations: [
    PersonasComponent,
    EditPersonaComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule
  ]
})
export class PersonasModule { }
