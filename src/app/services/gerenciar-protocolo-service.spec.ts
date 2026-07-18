import { TestBed } from '@angular/core/testing';

import { GerenciarProtocoloService } from './gerenciar-protocolo-service';

describe('GerenciarProtocoloService', () => {
  let service: GerenciarProtocoloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciarProtocoloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
