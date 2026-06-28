import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazendaDetalhe } from './fazenda-detalhe';

describe('FazendaDetalhe', () => {
  let component: FazendaDetalhe;
  let fixture: ComponentFixture<FazendaDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazendaDetalhe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FazendaDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
