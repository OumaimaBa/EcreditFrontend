import { TestBed } from '@angular/core/testing';

import { DossierCreditService } from './dossier-credit.service';

describe('DossierCreditService', () => {
  let service: DossierCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
