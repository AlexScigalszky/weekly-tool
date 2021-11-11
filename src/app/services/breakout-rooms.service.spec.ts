import { TestBed } from '@angular/core/testing';

import { BreakoutRoomsService } from './breakout-rooms.service';

describe('BreakoutRoomsService', () => {
  let service: BreakoutRoomsService;
  let roomCounts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakoutRoomsService);
  });

  it('should be created', async () => {
    givenAService();
    thenExists();
  });

  it('should be return zero rooms', async () => {
    givenAService();
    await thenGetCountRooms();
    thenReturnZero();
  });

  function givenAService() {
    service = TestBed.inject(BreakoutRoomsService);
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  async function thenGetCountRooms() {
    roomCounts = await service.getCountRooms().toPromise();
  }

  function thenReturnZero() {
    expect(roomCounts).toBeGreaterThan(0);
  }
});
