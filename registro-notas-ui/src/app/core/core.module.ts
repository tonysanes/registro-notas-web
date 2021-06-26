import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotFoundComponent,
    LoaderComponent
  ]
})
export class CoreModule { }
