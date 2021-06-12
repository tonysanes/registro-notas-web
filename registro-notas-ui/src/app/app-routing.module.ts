import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonasComponent } from './personas/personas.component';

const routes: Routes = [
  {
    path:"home",
    loadChildren:  () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path:"",
    redirectTo:"/home",
    pathMatch:"full"
  },
  {
    path:"alumnos",
    loadChildren:  () => import('./personas/personas.module').then(m => m.PersonasModule)
  },
  {
    path:"profesores",
    loadChildren:  () => import('./personas/personas.module').then(m => m.PersonasModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
