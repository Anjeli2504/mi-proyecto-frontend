import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OportunidadesRoutingModule } from './oportunidades-routing.module';
import { FeriasListComponent} from './Feria/list/list.component';
import { AsistenciaFormComponent } from './asistencias/asistencias.component';
import { PublicarOfertaComponent } from './oferta/publicar-oferta/publicar-oferta.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OportunidadesRoutingModule,
    FeriasListComponent,
    AsistenciaFormComponent,
    PublicarOfertaComponent
  ]
})
export class OportunidadesModule {}