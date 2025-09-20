import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeriasListComponent } from '../../oportunidades/Feria/list/list.component'; 
import { OfertaListComponent} from '../../oportunidades/oferta/oferta-list/oferta-list.component'; 
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  imports: [
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FeriasListComponent,
    OfertaListComponent
],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent implements OnInit {
  email: string | null = '';
  nombre: string | null = '';
  rol: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.email = this.authService.getemail();
    this.nombre = this.authService.getNombre(); // asegúrate de tener este método
    this.rol = this.authService.getRol();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
