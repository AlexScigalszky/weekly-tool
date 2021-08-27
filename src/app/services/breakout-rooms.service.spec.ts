import { TestBed } from '@angular/core/testing';

import { BreakoutRoomsService } from './breakout-rooms.service';

describe('BreakoutRoomsService', () => {
  let service: BreakoutRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakoutRoomsService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
    const roomCounts = await service.getCountRooms().toPromise();
    expect(roomCounts).toBeGreaterThan(0);
  });
});
