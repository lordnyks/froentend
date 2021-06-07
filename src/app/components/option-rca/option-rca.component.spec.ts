import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionRcaComponent } from './option-rca.component';

describe('OptionRcaComponent', () => {
  let component: OptionRcaComponent;
  let fixture: ComponentFixture<OptionRcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionRcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionRcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
