import { TestBed } from '@angular/core/testing';

import { ComprasserviceService } from './comprasservice.service';

describe('ComprasserviceService', () => {
  let service: ComprasserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
