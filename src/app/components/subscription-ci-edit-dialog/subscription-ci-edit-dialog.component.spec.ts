import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCiEditDialogComponent } from './subscription-ci-edit-dialog.component';

describe('SubscriptionCiEditDialogComponent', () => {
  let component: SubscriptionCiEditDialogComponent;
  let fixture: ComponentFixture<SubscriptionCiEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionCiEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCiEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
