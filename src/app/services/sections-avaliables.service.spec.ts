import { TestBed } from '@angular/core/testing';

import { SectionsAvaliablesService } from './sections-avaliables.service';

describe('SectionsAvaliablesService', () => {
  let service: SectionsAvaliablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionsAvaliablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
