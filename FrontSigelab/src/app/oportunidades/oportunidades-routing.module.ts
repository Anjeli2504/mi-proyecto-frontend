import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeriasListComponent } from './Feria/list/list.component';

const routes: Routes = [
  { path: '', component: FeriasListComponent } // default dentro de /oportunidades
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OportunidadesRoutingModule {}