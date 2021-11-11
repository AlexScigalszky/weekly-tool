import { TestBed } from '@angular/core/testing';

import { SectionsAvaliablesService } from './sections-avaliables.service';

describe('SectionsAvaliablesService', () => {
  let service: SectionsAvaliablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionsAvaliablesService);
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  function givenAService() {
    service = TestBed.inject(SectionsAvaliablesService);
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }
});
