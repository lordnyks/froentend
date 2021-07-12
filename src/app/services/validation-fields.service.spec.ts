import { TestBed } from '@angular/core/testing';

import { ValidationFieldsService } from './validation-fields.service';

describe('ValidationFieldsService', () => {
  let service: ValidationFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
