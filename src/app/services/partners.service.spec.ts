import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { PartnersService } from './partners.service';

describe('PartnersService', () => {
  let service: PartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
    });
    service = TestBed.inject(PartnersService);
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  function givenAService() {
    service = TestBed.inject(PartnersService);
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }
});
