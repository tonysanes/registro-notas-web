import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ManagePersonaComponent } from './manage-persona/manage-persona.component';
import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    PersonasComponent,
    ManagePersonaComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PersonasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    DatePipe
  ]
})
export class PersonasModule { }
