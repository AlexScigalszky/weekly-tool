import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RandomWordsService } from './random-words.service';

describe('RandomWordsService', () => {
  let service: RandomWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule,
      ],

      providers: [{ provide: HttpClient, useclass: HttpClient }],
    });
    service = TestBed.inject(RandomWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
