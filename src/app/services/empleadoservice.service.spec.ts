import { TestBed } from '@angular/core/testing';

import { EmpleadoserviceService } from './empleadoservice.service';

describe('EmpleadoserviceService', () => {
  let service: EmpleadoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
