import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazendaCriar } from './fazenda-criar';

describe('FazendaCriar', () => {
  let component: FazendaCriar;
  let fixture: ComponentFixture<FazendaCriar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazendaCriar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FazendaCriar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
