import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazendaNova } from './fazenda-nova';

describe('FazendaNova', () => {
  let component: FazendaNova;
  let fixture: ComponentFixture<FazendaNova>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazendaNova]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FazendaNova);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
