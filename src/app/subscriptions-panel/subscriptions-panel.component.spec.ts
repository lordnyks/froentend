import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsPanelComponent } from './subscriptions-panel.component';

describe('SubscriptionsPanelComponent', () => {
  let component: SubscriptionsPanelComponent;
  let fixture: ComponentFixture<SubscriptionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
