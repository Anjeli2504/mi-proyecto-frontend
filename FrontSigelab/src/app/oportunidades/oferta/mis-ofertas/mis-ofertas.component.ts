import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mis-ofertas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './mis-ofertas.component.html',
  styleUrls: ['./mis-ofertas.component.scss']
})
export class MisOfertasComponent implements OnInit {
  ofertas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:4000/api/ofertas/mis-aplicadas', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: data => this.ofertas = data,
      error: err => console.error('Error al cargar ofertas aplicadas:', err)
    });
    }
}
