import { TestBed } from '@angular/core/testing';
import { SimpsonService } from './simpson.service';

describe('SimpsonService', () => {
  let service: SimpsonService;
  let quote = null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  it('should return a quote', () => {
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
    quote = service.getOne();
    console.log(quote);
    
  }

  function thenReturnAQuote() {
    expect(quote).toBeTruthy();
  }
});
