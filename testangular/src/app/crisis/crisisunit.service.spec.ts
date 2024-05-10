import { TestBed } from '@angular/core/testing';

import { CrisisunitService } from './crisisunit.service';

describe('CrisisunitService', () => {
  let service: CrisisunitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrisisunitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
