import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { BreakoutRoomsFirebaseService } from './breakout-rooms-firebase.service';

describe('BreakoutRoomsFirebaseService', () => {
  let service: BreakoutRoomsFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
    });
    service = TestBed.inject(BreakoutRoomsFirebaseService);
  });

  it(
    'should be created',
    waitForAsync(async () => {
      expect(service).toBeTruthy();
      const roomCounts = await service.getCountRooms().toPromise();
      expect(roomCounts).toBeGreaterThan(0);
    }),
  );
});
