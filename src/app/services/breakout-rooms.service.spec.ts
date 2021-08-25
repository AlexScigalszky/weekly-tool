import { TestBed } from '@angular/core/testing';

import { BreakoutRoomsService } from './breakout-rooms.service';

describe('BreakoutRoomsService', () => {
  let service: BreakoutRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakoutRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.rooms).toBeTruthy();
    expect(service.rooms.length).toBeGreaterThan(0)
  });

  it('should be created', () => {
    service.rooms.forEach(_ => {
      expect(service.getRandomLink()).toBeDefined();  
    });
    
  });
});
