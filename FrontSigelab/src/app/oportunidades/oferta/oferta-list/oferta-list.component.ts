import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-ofertas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: '../oferta-list/oferta-list.component.html',
  styleUrls: ['../oferta-list/oferta-list.component.scss']
})
export class OfertaListComponent implements OnInit {
  ofertas: any[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarOfertas();
  }

  cargarOfertas(): void {
    this.http.get<any[]>('http://localhost:4000/api/ofertas').subscribe({
      next: (data) => this.ofertas = data,
      error: (err) => console.error('Error al cargar ofertas:', err)
    });
  }

  verDetalles(oferta: any): void {
    console.log('Detalles de oferta:', oferta);
    // Aquí podrías abrir un diálogo o navegar a un detalle
  }
}
