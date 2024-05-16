import { TestBed } from '@angular/core/testing';

import { IncidentbookService } from './incidentbook.service';

describe('IncidentbookService', () => {
  let service: IncidentbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
