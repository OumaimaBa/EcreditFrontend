import { TestBed } from '@angular/core/testing';

import { PjDemandesService } from './pj-demandes.service';

describe('PjDemandesService', () => {
  let service: PjDemandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PjDemandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
