import { TestBed } from '@angular/core/testing';
import { SimpsonService } from './simpson.service';

describe('SimpsonService', () => {
  let service: SimpsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  it('voting system property should be exists', () => {
    givenAService();
    whenGetOneIsCalled();
    thenReturnAQuote();
  });

  function givenAService() {
    service = new SimpsonService();
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  function whenGetOneIsCalled() {
    this.quote = service.getOne();
  }

  function thenReturnAQuote() {
    expect(this.quote).toBeTruthy();
  }
});
