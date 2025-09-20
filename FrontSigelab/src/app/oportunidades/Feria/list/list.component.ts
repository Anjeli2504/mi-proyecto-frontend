import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ferias-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FeriasListComponent implements OnInit {
  eventos: any[] = [];

  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:4000/api/eventos').subscribe({
      next: (data) => this.eventos = data,
      error: (err) => console.error('Error cargando ferias:', err)
    });
  }

  sanitizarUrl(url: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  registrarse(evento: any) {
    this.router.navigate(['/asistencia'], { queryParams: { eventoId: evento.id } });
  }
}
