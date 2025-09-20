import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatChipsModule]
})
export class HeaderComponent implements OnInit {
  nombre: string | null = '';
  rol: string | null = '';
  email: string | null = '';
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.nombre = this.authService.getNombre();
    this.email = this.authService.getemail();
    this.rol = this.authService.getRol();
    this.isAuthenticated = this.authService.isAuthenticated();
    
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.email = user.email;
        this.rol = user.rol;
      } else {
        this.email = null;
        this.rol = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }

  isAdmin(): boolean {
    return this.rol?.toUpperCase() === 'ADMIN';
  }
}

