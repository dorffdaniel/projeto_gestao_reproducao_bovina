import { TestBed } from '@angular/core/testing';

import { GerenciarLoteService } from './gerenciar-lote-service';

describe('GerenciarLoteService', () => {
  let service: GerenciarLoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciarLoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
