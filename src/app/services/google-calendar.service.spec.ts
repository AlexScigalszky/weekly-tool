import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { GoogleCalendarService } from './google-calendar.service';

describe('GoogleCalendarService', () => {
  let service: GoogleCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
    });
    service = TestBed.inject(GoogleCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a new meet link', () => {
    expect(service.getNewMeetLink()).toBeDefined();
  });

  
});
