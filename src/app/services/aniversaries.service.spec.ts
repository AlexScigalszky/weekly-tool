import { TestBed } from '@angular/core/testing';
import { Partner } from '../models/partner';

import { AniversariesService } from './aniversaries.service';

describe('AniversariesService', () => {
  let service: AniversariesService;
  const partners: Partner[] = [new Partner('', new Date())];
  let partner: Partner;
  let peoples: Partner[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AniversariesService);
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  it('should return a list of people', () => {
    givenAService();
    whenGetWhoHaveAnAniversaryFromEmptyList();
    thenReturnsZeroPeople();
  });

  it('should filter all new people ', () => {
    givenAService();
    whenGetWhoHaveAnAniversaryFromListWithNewPeople();
    thenReturnsZeroPeople();
  });

  it('should filter people with one year in company ', () => {
    givenAService();
    whenGetWhoHaveAnAniversaryFromListWithAPartnerFromAYearAgo();
    thenReturnsTheSamePeople();
  });

  function givenAService() {
    service = TestBed.inject(AniversariesService);
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  function whenGetWhoHaveAnAniversaryFromEmptyList() {
    peoples = service.getWhoHaveAnAniversary([]);
  }

  function thenReturnsZeroPeople() {
    expect(peoples).toBeTruthy();
    expect(peoples).toBeGreaterThanOrEqual(0);
  }

  function whenGetWhoHaveAnAniversaryFromListWithNewPeople() {
    peoples = service.getWhoHaveAnAniversary(partners);
  }

  function whenGetWhoHaveAnAniversaryFromListWithAPartnerFromAYearAgo() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    partner = new Partner('', date);
    peoples = service.getWhoHaveAnAniversary([partner, ...partners]);
  }

  function thenReturnsTheSamePeople() {
    expect(peoples.length).toBeGreaterThanOrEqual(1);
    expect(peoples[0].id).toEqual(partner.id);
  }
});
