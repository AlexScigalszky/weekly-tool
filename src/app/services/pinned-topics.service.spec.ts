import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { PinnedTopicsService } from './pinned-topics.service';
import { environment } from 'src/environments/environment';

describe('PinnedTopicsService', () => {
  let service: PinnedTopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
    });
    service = TestBed.inject(PinnedTopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
