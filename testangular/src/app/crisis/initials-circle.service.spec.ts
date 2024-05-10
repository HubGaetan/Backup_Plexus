import { TestBed } from '@angular/core/testing';

import { InitialsCircleService } from './initials-circle.service';

describe('InitialsCircleService', () => {
  let service: InitialsCircleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialsCircleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
