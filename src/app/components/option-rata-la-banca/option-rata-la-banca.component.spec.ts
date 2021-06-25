import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionRataLaBancaComponent } from './option-rata-la-banca.component';

describe('OptionRataLaBancaComponent', () => {
  let component: OptionRataLaBancaComponent;
  let fixture: ComponentFixture<OptionRataLaBancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionRataLaBancaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionRataLaBancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
