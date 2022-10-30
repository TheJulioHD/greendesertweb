import { TestBed } from '@angular/core/testing';

import { ClientesserviceService } from './clientesservice.service';

describe('ClientesserviceService', () => {
  let service: ClientesserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
