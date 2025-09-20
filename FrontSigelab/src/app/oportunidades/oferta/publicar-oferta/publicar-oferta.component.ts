import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-publicar-oferta',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule],
  templateUrl: './publicar-oferta.component.html',
  styleUrls: ['./publicar-oferta.component.scss']
})
export class PublicarOfertaComponent {
  ofertaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.ofertaForm = this.fb.group({
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      requerimientos: ['', Validators.required]
    });
  }

  publicarOferta(): void {
    const token = localStorage.getItem('token');
    this.http.post('http://localhost:4000/api/ofertas/empresa', this.ofertaForm.value, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => {
      alert('Oferta publicada correctamente');
      this.ofertaForm.reset();
    });
  }
}
