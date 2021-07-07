import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonasRoutingModule } from './personas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ManageAlumnoComponent } from './alumnos/manage-alumno/manage-alumno.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { ManageProfesorComponent } from './profesores/manage-profesor/manage-profesor.component';
import { AdministrativosComponent } from './administrativos/administrativos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SidebarModule } from 'ng-sidebar';
import { ManageAdministrativosComponent } from './administrativos/manage-administrativos/manage-administrativos.component';

@NgModule({
  declarations: [
    AlumnosComponent,
    ManageAlumnoComponent,
    ProfesoresComponent,
    ManageProfesorComponent,
    AdministrativosComponent,
    ManageAdministrativosComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PersonasRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    SidebarModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class PersonasModule { }
