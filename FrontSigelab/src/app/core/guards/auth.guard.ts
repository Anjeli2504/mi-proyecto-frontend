import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

    canActivate(): boolean {
    if (!this.isBrowser) return false;

    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!token || !rol) {
      console.warn('No autorizado, falta token o rol');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
