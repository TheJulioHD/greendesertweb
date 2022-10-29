import { TestBed } from '@angular/core/testing';

import { AlmacenserviceService } from './almacenservice.service';

describe('AlmacenserviceService', () => {
  let service: AlmacenserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
