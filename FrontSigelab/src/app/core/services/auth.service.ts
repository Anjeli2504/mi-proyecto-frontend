import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  rol: string;
  email: string;
  nombre?: string;
  created_at?: string;
}

interface User {
  email: string;
  rol: string;
  nombre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private userSubject = new BehaviorSubject<User | null>(null);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const user = this.getStoredUser();
    if (user) this.userSubject.next(user);
  }

  register(nombre: string, email: string, password: string, rol: string, discapacidad?: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      nombre,
      email,
      password,
      rol,
      discapacidad
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        this.storeUser(response);
        this.userSubject.next({
          email: response.email,
          rol: response.rol,
          nombre: response.nombre
        });
        this.redirectBasedOnRole(response.rol);
        return response;
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('email');
      localStorage.removeItem('nombre');
      localStorage.removeItem('fechaRegistro');
    }
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getNombre(): string | null {
    return this.isBrowser ? localStorage.getItem('nombre') : null;
  }

  getRol(): string | null {
    return this.isBrowser ? localStorage.getItem('rol') : null;
  }

  getemail(): string | null {
    return this.isBrowser ? localStorage.getItem('email') : null;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  private storeUser(data: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.rol);
      localStorage.setItem('email', data.email);
      if (data.nombre) localStorage.setItem('nombre', data.nombre);
      if (data.created_at) localStorage.setItem('fechaRegistro', data.created_at);
    }
  }

  private getStoredUser(): User | null {
    const token = this.getToken();
    const rol = this.getRol();
    const email = this.getemail();
    const nombre = this.getNombre();

    if (token && rol && email) {
      return { email, rol, nombre: nombre || '' };
    }
    return null;
  }

  public redirectBasedOnRole(rol: string): void {
  switch (rol.toUpperCase()) {
    case 'ADMIN':
      this.router.navigate(['/admin']);
      break;
    case 'USUARIO':
      this.router.navigate(['/home']);
      break;
    case 'EMPRESA':
      this.router.navigate(['/empresa']); // ✅ o como hayas definido la ruta de empresa
      break;
    default:
      this.router.navigate(['/login']);
  }
}
}
