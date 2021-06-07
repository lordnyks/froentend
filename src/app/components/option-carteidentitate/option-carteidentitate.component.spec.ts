import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCarteidentitateComponent } from './option-carteidentitate.component';

describe('OptionCarteidentitateComponent', () => {
  let component: OptionCarteidentitateComponent;
  let fixture: ComponentFixture<OptionCarteidentitateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionCarteidentitateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionCarteidentitateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
