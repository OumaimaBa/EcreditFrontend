import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesJComponent } from './pieces-j.component';

describe('PiecesJComponent', () => {
  let component: PiecesJComponent;
  let fixture: ComponentFixture<PiecesJComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiecesJComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
