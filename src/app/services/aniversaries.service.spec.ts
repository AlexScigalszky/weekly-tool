import { TestBed } from '@angular/core/testing';

import { AniversariesService } from './aniversaries.service';

describe('AniversariesService', () => {
  let service: AniversariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AniversariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of people', () => {
    const peoples = service.getWhoHaveAnAniversary()
    expect(peoples).toBeTruthy();
    expect(peoples).toBeGreaterThanOrEqual(0);
  });
});
