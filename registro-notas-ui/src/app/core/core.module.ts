import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SortHeaderDirective } from './directives/sort-header.directive';
import { CustomSidebarComponent } from './custom-sidebar/custom-sidebar.component';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoaderComponent,
    ConfirmModalComponent,
    SortHeaderDirective,
    CustomSidebarComponent
  ],
  imports: [
    CommonModule,
    SidebarModule.forRoot()
  ],
  exports: [
    NotFoundComponent,
    LoaderComponent,
    ConfirmModalComponent,
    CustomSidebarComponent
  ]
})
export class CoreModule { }
