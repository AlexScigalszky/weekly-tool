import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';
import { BreakoutRoomsServiceMock } from 'src/app/services/breakout-rooms-mock.service';
import { BreakoutRoomsService } from 'src/app/services/breakout-rooms.service';

import { BreakoutRoomsComponent } from './breakout-rooms.component';

describe('BreakoutRoomsComponent', () => {
  let component: BreakoutRoomsComponent;
  let fixture: ComponentFixture<BreakoutRoomsComponent>;
  let breakoutRoomsService = new BreakoutRoomsServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakoutRoomsComponent],
      providers: [
        { provide: BreakoutRoomsService, useValue: breakoutRoomsService },
        {
          provide: BreakoutRoomsFirebaseService,
          useValue: breakoutRoomsService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakoutRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
