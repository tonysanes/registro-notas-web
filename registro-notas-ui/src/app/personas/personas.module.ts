import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonasRoutingModule } from './personas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ManageAlumnoComponent } from './alumnos/manage-alumno/manage-alumno.component';

@NgModule({
  declarations: [
    AlumnosComponent,
    ManageAlumnoComponent
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
