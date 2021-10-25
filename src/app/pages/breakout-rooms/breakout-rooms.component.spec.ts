import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RetroService } from 'src/app/retro/services/retro.service';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';
import { BreakoutRoomsServiceMock } from 'src/app/services/breakout-rooms-mock.service';
import { BreakoutRoomsService } from 'src/app/services/breakout-rooms.service';
import { findEl, hasText } from 'src/test.helpers';

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
        {
          provide: RetroService,
          useValue: {
            setRoom: (name: string) => {},
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { room: 'default-test' } },
          },
        },
        {
          provide: Window,
          useValue: {
            open: () =>{},
          },
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

  it('should show a link to breakout room', fakeAsync(() => {
    fixture = TestBed.createComponent(BreakoutRoomsComponent);
    fixture.detectChanges();

    const link = findEl(fixture, '#breakout-link');
    expect(link).toBeTruthy();

    tick(2301);
    fixture.detectChanges();
    hasText(fixture, '#breakout-link', 'Entrar');

    const plenaryLink = findEl(fixture, '#plenary-link');
    expect(plenaryLink).toBeTruthy();
  }));
});
