import { TestBed } from '@angular/core/testing';
import { Partner } from '../models/partner';

import { AniversariesService } from './aniversaries.service';

describe('AniversariesService', () => {
  let service: AniversariesService;
  const partners: Partner[] = [new Partner('', new Date())];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AniversariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of people', () => {
    const peoples = service.getWhoHaveAnAniversary([]);
    expect(peoples).toBeTruthy();
    expect(peoples).toBeGreaterThanOrEqual(0);
  });

  it('should filter all new people ', () => {
    const peoples = service.getWhoHaveAnAniversary(partners);
    expect(peoples.length).toEqual(0);
  });

  it('should filter people with one year in company ', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const partner = new Partner('', date);
    const peoples = service.getWhoHaveAnAniversary([partner, ...partners]);
    expect(peoples.length).toBeGreaterThanOrEqual(1);
    expect(peoples[0].id).toEqual(partner.id);
  });
});
