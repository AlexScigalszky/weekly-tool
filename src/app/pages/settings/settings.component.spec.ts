import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { BreakoutRoomsService } from './../../services/breakout-rooms.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { findEl, setValueTo } from 'src/test.helpers';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';
import { BreakoutRoomsServiceMock } from './breakout-rooms-mock.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let patioInput: DebugElement;
  let cafeteriaInput: DebugElement;
  let salaDeReunionesInput: DebugElement;
  let pisoDeAbajoInput: DebugElement;
  let cocinaInput: DebugElement;
  let pisoDeArribaInput: DebugElement;
  let createButton: DebugElement;
  let patio = 'https://meet.google.com/stw-zgec-zez';
  let cafeteria = 'https://meet.google.com/knv-dvzy-sgg';
  let salaDeReuniones = 'https://meet.google.com/nnu-mihm-nfw';
  let pisoDeAbajo = 'https://meet.google.com/ykv-kgyz-toq';
  let cocina = 'https://meet.google.com/jsb-teai-zfd';
  let pisoDeArriba = 'https://meet.google.com/tqr-ersq-bwy';
  let breakoutRoomsService = new BreakoutRoomsServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
      ],
      declarations: [SettingsComponent],
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
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    patioInput = findEl(fixture, '#patio')!;
    cafeteriaInput = findEl(fixture, '#cafeteria')!;
    salaDeReunionesInput = findEl(fixture, '#sala-de-reuniones')!;
    pisoDeAbajoInput = findEl(fixture, '#piso-de-abajo')!;
    cocinaInput = findEl(fixture, '#cocina')!;
    pisoDeArribaInput = findEl(fixture, '#piso-de-arriba')!;

    createButton = findEl(fixture, '#create-button')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 rooms inputs', () => {
    expect(patioInput.nativeElement).toBeTruthy();
    expect(cafeteriaInput.nativeElement).toBeTruthy();
    expect(salaDeReunionesInput.nativeElement).toBeTruthy();
    expect(pisoDeAbajoInput.nativeElement).toBeTruthy();
    expect(cocinaInput.nativeElement).toBeTruthy();
    expect(pisoDeArribaInput.nativeElement).toBeTruthy();

    expect(createButton.nativeElement).toBeTruthy();
  });

  it(
    'should call to create function',
    waitForAsync(() => {
      let spy = spyOn(component, 'save');
      createButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }),
  );

  it(
    'should call to update function with empty values',
    waitForAsync(() => {
      let spy = spyOn(breakoutRoomsService, 'update');
      createButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith('', '', '', '', '', '');
    }),
  );

  it(
    'should call to update function with new values values',
    waitForAsync(() => {
      setValueTo(patioInput, patio);
      setValueTo(cafeteriaInput, cafeteria);
      setValueTo(salaDeReunionesInput, salaDeReuniones);
      setValueTo(pisoDeAbajoInput, pisoDeAbajo);
      setValueTo(cocinaInput, cocina);
      setValueTo(pisoDeArribaInput, pisoDeArriba);

      fixture.detectChanges();

      let spy = spyOn(breakoutRoomsService, 'update');
      createButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(
        patio,
        cafeteria,
        salaDeReuniones,
        pisoDeAbajo,
        cocina,
        pisoDeArriba,
      );
    }),
  );
});
