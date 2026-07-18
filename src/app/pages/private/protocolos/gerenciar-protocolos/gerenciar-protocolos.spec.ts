import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarProtocolos } from './gerenciar-protocolos';

describe('GerenciarProtocolos', () => {
  let component: GerenciarProtocolos;
  let fixture: ComponentFixture<GerenciarProtocolos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarProtocolos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarProtocolos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
