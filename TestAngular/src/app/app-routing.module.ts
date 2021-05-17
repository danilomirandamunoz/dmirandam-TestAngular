import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ListaComponent } from './components/lista/lista.component';

const routes: Routes = [
  { path: 'empleados', component: ListaComponent},
  { path: 'empleado/:codEmpleado/:editable', component: DetalleComponent},
  { path: 'empleado', component: DetalleComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'empleados'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
