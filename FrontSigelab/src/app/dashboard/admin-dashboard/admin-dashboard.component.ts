import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EventosService } from '../../core/services/eventos.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  feriaForm!: FormGroup;
  ofertaForm!: FormGroup;

  constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  private eventosService: EventosService,
  private router: Router
)
 {
    this.feriaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      ubicacion: ['', Validators.required],
      mapa: ['', Validators.required]
    });

    this.ofertaForm = this.fb.group({
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      requerimientos: ['', Validators.required],
    });
  }

  crearFeria(): void {
  if (this.feriaForm.invalid) return;

  this.eventosService.crearEvento(this.feriaForm.value).subscribe({
    next: () => alert('Feria registrada correctamente'),
    error: (err) => {
      console.error('Error al registrar feria:', err);
      alert('Error al registrar feria');
    }
  });
}
  crearOferta(): void {
    if (this.ofertaForm.invalid) return;
    this.http.post('http://localhost:4000/api/ofertas', this.ofertaForm.value).subscribe({
      next: () => alert('Oferta registrada'),
      error: () => alert('Error al registrar oferta')
    });
  }

  ngOnInit(): void {
  const rol = localStorage.getItem('rol');
  if (rol !== 'ADMIN') {
    this.router.navigate(['/login']);
  }
  }
}