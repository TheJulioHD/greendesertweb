import { TestBed } from '@angular/core/testing';

import { ProveedorserviceService } from './proveedorservice.service';

describe('ProveedorserviceService', () => {
  let service: ProveedorserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
