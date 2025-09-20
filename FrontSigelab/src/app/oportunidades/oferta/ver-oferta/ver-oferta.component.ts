import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ver-oferta',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './ver-oferta.component.html',
  styleUrls: ['./ver-oferta.component.scss']
})
export class VerOfertaComponent implements OnInit {
  oferta: any = null;
  ofertaId!: number;
  cvFile: File | null = null;
  isApplying = false;
  yaAplicado = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ofertaId = +params['id'];
      this.cargarOferta();
    });
  }

  cargarOferta(): void {
    const token = localStorage.getItem('token');

    this.http.get(`http://localhost:4000/api/ofertas/${this.ofertaId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data: any) => {
        this.oferta = data;
        this.yaAplicado = data.yaAplicado || false;
      },
      error: () => alert('Error al cargar la oferta')
    });
  }

  onFileSelected(event: any): void {
    this.cvFile = event.target.files[0];
  }

  aplicar(): void {
    if (!this.cvFile || !this.ofertaId) return;

    const formData = new FormData();
    formData.append('cv', this.cvFile);
    formData.append('oferta_id', this.ofertaId.toString());

    const token = localStorage.getItem('token');
    this.isApplying = true;

    this.http.post('http://localhost:4000/api/ofertas/aplicar', formData, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert('Aplicación enviada con éxito');
        this.isApplying = false;
        this.yaAplicado = true;
      },
      error: () => {
        alert('Error al aplicar a la oferta');
        this.isApplying = false;
      }
    });
  }
}
