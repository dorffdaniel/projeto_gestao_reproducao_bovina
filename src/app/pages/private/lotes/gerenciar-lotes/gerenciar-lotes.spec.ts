import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarLotes } from './gerenciar-lotes';

describe('GerenciarLotes', () => {
  let component: GerenciarLotes;
  let fixture: ComponentFixture<GerenciarLotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarLotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarLotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
