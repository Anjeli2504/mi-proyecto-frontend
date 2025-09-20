import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asistencia-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss']
})
export class AsistenciaFormComponent implements OnInit {
  form!: FormGroup;
  eventoId!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  this.form = this.fb.group({
    nombre: ['', Validators.required],
    telefono: [''],
    cedula: ['', [Validators.required, Validators.minLength(6)]]
  });

    this.route.queryParams.subscribe(params => {
      this.eventoId = +params['eventoId'];
    });
  }

  onSubmit(): void {
  if (this.form.invalid || !this.eventoId) return;

  const payload = {
  formulario: this.form.value
  };


  this.http.post(`http://localhost:4000/api/asistencias/${this.eventoId}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).subscribe({
    next: () => {
      this.snackBar.open('Te has registrado exitosamente', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/mis-ferias']);
    },
    error: err => {
      if (err.status === 409) {
        this.snackBar.open('Ya estás registrado a esta feria', 'Cerrar', { duration: 3000 });
      } else {
        this.snackBar.open('Error al registrar', 'Cerrar', { duration: 3000 });
      }
      console.error(err);
    }
  });
}
}