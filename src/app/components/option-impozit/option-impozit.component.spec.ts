import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionImpozitComponent } from './option-impozit.component';

describe('OptionImpozitComponent', () => {
  let component: OptionImpozitComponent;
  let fixture: ComponentFixture<OptionImpozitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionImpozitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionImpozitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
