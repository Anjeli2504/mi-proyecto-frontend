import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  editando: boolean = false;

  constructor(private fb: FormBuilder, private AuthService: AuthService, private http: HttpClient) {}
  fechaRegistro: string | null = ''; 

ngOnInit(): void {
    const nombre = this.AuthService.getNombre();
    const email = this.AuthService.getemail();
    const rol = this.AuthService.getRol();

    this.perfilForm = this.fb.group({
      nombre: [{ value: nombre, disabled: true }, Validators.required],
      email: [{ value: email, disabled: true }, [Validators.required, Validators.email]],
      rol: [{ value: rol, disabled: true }]
    });
    this.fechaRegistro = localStorage.getItem('fechaRegistro');
  }

  guardar(): void {
    this.http.put('/api/auth/perfil', this.perfilForm.value)
      .subscribe(() => alert('Perfil actualizado'));
  }
}
