import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-oferta-empresa',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './oferta-empresa.component.html',
  styleUrls: ['./oferta-empresa.component.css']
})
export class OfertaEmpresaComponent implements OnInit {
  ofertas: any[] = [];
  aplicantes: any[] = [];
  ofertaSeleccionada: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`http://localhost:4000/api/ofertas/empresa/mis-ofertas`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .subscribe({
    next: data => {
      console.log('Ofertas recibidas:', data);
      this.ofertas = data;
    },
    error: err => console.error('Error cargando ofertas:', err)
  });
  }

  verAplicantes(ofertaId: number) {
   this.ofertaSeleccionada = this.ofertas.find(o => o.id === ofertaId);

  this.http.get<any[]>(`http://localhost:4000/api/ofertas/${ofertaId}/aplicaciones`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).subscribe({
    next: data => {
      this.aplicantes = data;
    },
    error: err => {
      this.aplicantes = [];
      console.error('Error obteniendo aplicantes', err);
    }
  });
 }
}
