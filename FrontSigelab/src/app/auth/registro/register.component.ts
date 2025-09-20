import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      tieneDiscapacidad: [false],
      discapacidad: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const { nombre, email, password, tieneDiscapacidad, discapacidad } = this.registerForm.value;

    const datos = {
      nombre,
      email,
      password,
      rol: 'USUARIO',
      discapacidad: tieneDiscapacidad ? discapacidad : null
    };

    this.authService.register(
      datos.nombre,
      datos.email,
      datos.password,
      datos.rol,
      datos.discapacidad
    ).subscribe({
      next: (res) => { 
        this.isSubmitting = false;
        console.log('Respuesta del backend:', res);
        this.snackBar.open('Registro exitoso, ahora puedes iniciar sesión', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Espera 3 segundos para redirigir
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.mensaje || 'Error al registrarse.';
      }
    });
  }


}
