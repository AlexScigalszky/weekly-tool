import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from 'src/environments/environment';

import { RetroService } from './retro.service';

describe('RetroService', () => {
  let service: RetroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatCommonModule,
        ReactiveFormsModule,
        MatIconModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    });
    service = TestBed.inject(RetroService);
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  it('should return an obserble of lists', () => {
    givenAService();
    thenReturnAnObservableList();
  });

  function givenAService() {
    service = TestBed.inject(RetroService);
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  function thenReturnAnObservableList() {
    const list$ = service.list();
    expect(list$).toBeTruthy();
  }
});
