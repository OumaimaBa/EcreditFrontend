import { TestBed } from '@angular/core/testing';

import { LigneCreditService } from './ligne-credit.service';

describe('LigneCreditService', () => {
  let service: LigneCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
