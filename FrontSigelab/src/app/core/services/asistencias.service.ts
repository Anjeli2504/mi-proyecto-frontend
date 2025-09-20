import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  private url = 'http://localhost:4000/api/asistencias';

  constructor(private http: HttpClient) {}

  confirmarAsistencia(eventoId: number, data: any): Observable<any> {
    return this.http.post(`${this.url}/${eventoId}`, data);
  }
}