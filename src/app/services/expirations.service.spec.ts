import { TestBed } from '@angular/core/testing';

import { ExpirationsService } from './expirations.service';

describe('ExpirationsService', () => {
  let service: ExpirationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpirationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
