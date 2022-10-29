import { TestBed } from '@angular/core/testing';

import { VentasserviceService } from './ventasservice.service';

describe('VentasserviceService', () => {
  let service: VentasserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
