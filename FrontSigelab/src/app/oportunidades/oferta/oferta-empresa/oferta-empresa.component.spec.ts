import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaEmpresaComponent } from './oferta-empresa.component';

describe('OfertaEmpresaComponent', () => {
  let component: OfertaEmpresaComponent;
  let fixture: ComponentFixture<OfertaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertaEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
