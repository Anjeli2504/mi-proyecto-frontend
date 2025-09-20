import { Component } from '@angular/core';
import { PublicarOfertaComponent } from "../../oportunidades/oferta/publicar-oferta/publicar-oferta.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-empresa-dashboard',
  templateUrl: './empresa-dashboard.component.html',
  styleUrls: ['./empresa-dashboard.component.scss'],
  imports: [PublicarOfertaComponent, MatCardModule ]
})
export class EmpresaDashboardComponent {}