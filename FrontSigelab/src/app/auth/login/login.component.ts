import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../app/core/services/auth.service';
import { Router } from '@angular/router';

// 👉 Importa Angular Material aquí
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });

    if (this.authService.isAuthenticated()) {
      const rol = this.authService.getRol();
      console.log('ROL:', rol); // 👈
      if (rol) {
        this.authService.redirectBasedOnRole(rol);
      }
    }
  }


  onSubmit(): void {
  if (this.loginForm.invalid) return;

  this.isSubmitting = true;
  this.errorMessage = '';

  const { username, password } = this.loginForm.value;

  this.authService.login(username, password).subscribe({
    next: () => {
      this.isSubmitting = false;

    const rol = this.authService.getRol();
    if (rol) {
      this.authService.redirectBasedOnRole(rol);
    } else {
      this.router.navigate(['/login']);
    }
    },
    error: (error) => {
      this.isSubmitting = false;
      this.errorMessage = error.error?.mensaje || 'Error al iniciar sesión';
    }
  });
}
}


