import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisFeriasComponent } from './mis-ferias.component';

describe('MisFeriasComponent', () => {
  let component: MisFeriasComponent;
  let fixture: ComponentFixture<MisFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisFeriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
