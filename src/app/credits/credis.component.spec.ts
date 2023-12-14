import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredisComponent } from './credis.component';

describe('CredisComponent', () => {
  let component: CredisComponent;
  let fixture: ComponentFixture<CredisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
