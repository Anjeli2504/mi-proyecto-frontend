import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-oferta-card',
  standalone: true,
  imports: [CommonModule,RouterModule, MatCardModule, MatButtonModule, MatIconModule ],
  templateUrl: './oferta-card.component.html',
  styleUrls: ['./oferta-card.component.scss']
})
export class OfertaCardComponent {
  @Input() oferta: any;
  cvFile: File | null = null;
  showUpload = false;
  isApplying = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.cvFile = event.target.files[0];
  }

  aplicar(): void {
    if (!this.cvFile) return;

    this.isApplying = true;
    const formData = new FormData();
    formData.append('cv', this.cvFile);
    formData.append('oferta_id', this.oferta.id); // asegúrate que `id` venga en oferta

    const token = localStorage.getItem('token');
    this.http.post('http://localhost:4000/api/ofertas/aplicar', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        alert('Aplicación enviada con éxito');
        this.isApplying = false;
        this.showUpload = false;
      },
      error: (err) => {
        alert('Error al aplicar a la oferta');
        this.isApplying = false;
      }
    });
  }
}
