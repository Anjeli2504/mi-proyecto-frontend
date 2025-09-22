import { Routes } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/registro/register.component';
import { LandingComponent } from './dashboard/landing/landing.component';
import { FeriasListComponent } from './oportunidades/Feria/list/list.component';
import { OfertaListComponent } from './oportunidades/oferta/oferta-list/oferta-list.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { AsistenciaFormComponent } from './oportunidades/asistencias/asistencias.component';
import { EmpresaDashboardComponent } from './dashboard/empresa-dashboard/empresa-dashboard.component';
import { MisOfertasComponent } from './oportunidades/oferta/mis-ofertas/mis-ofertas.component';
import { MisFeriasComponent} from './oportunidades/Feria/mis-ferias/mis-ferias.component';
import { VerOfertaComponent} from './oportunidades/oferta/ver-oferta/ver-oferta.component';
import { OfertaEmpresaComponent} from './oportunidades/oferta/oferta-empresa/oferta-empresa.component';

export const routes: Routes = [

  { path: 'inicio', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'eventos', component: FeriasListComponent, canActivate: [AuthGuard] },
  { path: 'ofertas', component: OfertaListComponent, canActivate: [AuthGuard] },
  { path: 'oferta/:id', component: VerOfertaComponent, canActivate: [AuthGuard] },
  { path: 'asistencia', component: AsistenciaFormComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },  // ruta para eventos/ofertas
  { path: 'empresa', component: EmpresaDashboardComponent, canActivate: [AuthGuard] }, 
  { path: 'mis-ferias', component: MisFeriasComponent, canActivate: [AuthGuard] }, 
  { path: 'mis-ofertas', component: MisOfertasComponent, canActivate: [AuthGuard] },  
  { path: 'ver-ofertas', component: OfertaEmpresaComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' }
];
