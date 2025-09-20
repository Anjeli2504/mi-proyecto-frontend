import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriaCardComponent } from './feria-card.component';

describe('FeriaCardComponent', () => {
  let component: FeriaCardComponent;
  let fixture: ComponentFixture<FeriaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeriaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
