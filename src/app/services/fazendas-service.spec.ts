import { TestBed } from '@angular/core/testing';

import { FazendasService } from './fazendas-service';

describe('FazendasService', () => {
  let service: FazendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FazendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
