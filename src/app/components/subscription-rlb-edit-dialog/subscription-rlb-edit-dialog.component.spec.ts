import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRlbEditDialogComponent } from './subscription-rlb-edit-dialog.component';

describe('SubscriptionRlbEditDialogComponent', () => {
  let component: SubscriptionRlbEditDialogComponent;
  let fixture: ComponentFixture<SubscriptionRlbEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionRlbEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionRlbEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
