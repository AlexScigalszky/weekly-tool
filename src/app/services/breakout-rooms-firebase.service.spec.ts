import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { BreakoutRoomsFirebaseService } from './breakout-rooms-firebase.service';

describe('BreakoutRoomsFirebaseService', () => {
  let service: BreakoutRoomsFirebaseService;
  let roomCounts;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
    });
    service = TestBed.inject(BreakoutRoomsFirebaseService);
  });

  it(
    'should be created',
    waitForAsync(async () => {
      givenAService();
      thenExists();
    }),
  );

  it(
    'should return a promise with zero count rooms',
    waitForAsync(async () => {
      givenAService();
      await thenGetCountRooms();
      thenReturnZero();
    }),
  );
  function givenAService() {
    service = TestBed.inject(BreakoutRoomsFirebaseService);
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
