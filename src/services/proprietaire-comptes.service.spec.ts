import { TestBed } from '@angular/core/testing';

import { ProprietaireComptesService } from './proprietaire-comptes.service';

describe('ProprietaireComptesService', () => {
  let service: ProprietaireComptesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprietaireComptesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
