import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionImpozitEditDialogComponent } from './subscription-impozit-edit-dialog.component';

describe('SubscriptionImpozitEditDialogComponent', () => {
  let component: SubscriptionImpozitEditDialogComponent;
  let fixture: ComponentFixture<SubscriptionImpozitEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionImpozitEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionImpozitEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
