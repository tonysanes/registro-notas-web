import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SortHeaderDirective } from './directives/sort-header.directive';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoaderComponent,
    ConfirmModalComponent,
    SortHeaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotFoundComponent,
    LoaderComponent,
    ConfirmModalComponent
  ]
})
export class CoreModule { }
