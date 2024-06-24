import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ResidentesComponent } from './components/residentes/residentes.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';

const routes: Routes = [
  { path:'', redirectTo: '/home', pathMatch: 'full' },
  { path:'home', component: HomeComponent },
  { path:'residentes', component: ResidentesComponent},
  { path:'departamento', component: DepartamentoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
