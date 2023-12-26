import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeConsultComponent } from './demande-consult.component';

describe('DemandeConsultComponent', () => {
  let component: DemandeConsultComponent;
  let fixture: ComponentFixture<DemandeConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
