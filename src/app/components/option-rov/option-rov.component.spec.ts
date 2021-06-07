import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionRovComponent } from './option-rov.component';

describe('OptionRovComponent', () => {
  let component: OptionRovComponent;
  let fixture: ComponentFixture<OptionRovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionRovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionRovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
