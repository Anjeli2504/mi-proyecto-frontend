import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent
  ],
  template: `
    <app-header *ngIf="showHeader"></app-header>
    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get showHeader(): boolean {
    const excludedRoutes = ['/', '/login', '/register'];
    return this.authService.isAuthenticated() && !excludedRoutes.includes(this.router.url);
  }
}
