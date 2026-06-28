import { TestBed } from '@angular/core/testing';

import { DetalheFazendaService } from './detalhe-fazenda-service';

describe('DetalheFazendaService', () => {
  let service: DetalheFazendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalheFazendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
