import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteNovo } from './lote-novo';

describe('LoteNovo', () => {
  let component: LoteNovo;
  let fixture: ComponentFixture<LoteNovo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteNovo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteNovo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
