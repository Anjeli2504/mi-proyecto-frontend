import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-mis-ferias',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule],
  templateUrl: './mis-ferias.component.html',
  styleUrls: ['./mis-ferias.component.scss']
})
export class MisFeriasComponent implements OnInit {
  ferias: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarMisFerias();
  }

  cargarMisFerias(): void {
    this.http.get<any[]>('http://localhost:4000/api/asistencias/mis-ferias', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    }).subscribe({
      next: data => this.ferias = data,
      error: err => console.error('Error al cargar ferias:', err)
    });
  }
  getCamposFormulario(formulario: any): { key: string, value: any }[] {
  return Object.entries(formulario).map(([key, value]) => ({ key, value }));
}
}
