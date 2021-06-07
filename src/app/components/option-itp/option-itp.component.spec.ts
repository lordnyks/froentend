import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionItpComponent } from './option-itp.component';

describe('OptionItpComponent', () => {
  let component: OptionItpComponent;
  let fixture: ComponentFixture<OptionItpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionItpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionItpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
