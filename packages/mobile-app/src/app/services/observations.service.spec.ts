import { TestBed } from '@angular/core/testing';

import { ObservationsService } from './observations.service';

describe('ObservationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservationsService = TestBed.get(ObservationsService);
    expect(service).toBeTruthy();
  });
});
