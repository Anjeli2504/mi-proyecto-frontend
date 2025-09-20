import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent)
  },

{
  path: 'admin',
  canActivate: [AdminGuard],
  loadComponent: () => import('../dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  
  {
    path: 'ofertas',
    canActivate: [AuthGuard],
    loadComponent: () => import('../oportunidades/oferta/oferta-list/oferta-list.component').then(m => m.OfertaListComponent)
  },
  {
    path: 'ferias',
    canActivate: [AuthGuard],
    loadComponent: () => import('../oportunidades/Feria/list/list.component').then(m => m.FeriasListComponent)
  },

  {
  path: 'empresa',
  canActivate: [AuthGuard],
  loadComponent: () => import('../dashboard/empresa-dashboard/empresa-dashboard.component').then(m => m.EmpresaDashboardComponent)
},
{
  path: 'mis-ofertas',
  loadComponent: () => import('../oportunidades/oferta/mis-ofertas/mis-ofertas.component').then(m => m.MisOfertasComponent),
  canActivate: [AuthGuard]
},
{
  path: 'mis-ferias',
  loadComponent: () => import('../oportunidades/Feria/mis-ferias/mis-ferias.component').then(m => m.MisFeriasComponent),
  canActivate: [AuthGuard]
},
{
  path: 'oferta/:id',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('../oportunidades/oferta/ver-oferta/ver-oferta.component').then(m => m.VerOfertaComponent)
},
{
  path: 'ver-ofertas',
  canActivate: [AuthGuard],
  loadComponent: () => import('../oportunidades/oferta/oferta-empresa/oferta-empresa.component')
    .then(m => m.OfertaEmpresaComponent)
},

{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
