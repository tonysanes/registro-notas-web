import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EditPersonaComponent } from './edit-persona/edit-persona.component';
import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PersonasComponent,
    EditPersonaComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class PersonasModule { }
