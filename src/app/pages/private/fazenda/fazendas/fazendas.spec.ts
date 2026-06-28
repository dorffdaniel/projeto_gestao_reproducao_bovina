import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fazendas } from './fazendas';

describe('Fazendas', () => {
  let component: Fazendas;
  let fixture: ComponentFixture<Fazendas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fazendas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fazendas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
