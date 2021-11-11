import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  it('should be initialize', () => {
    givenAService();
    whenInitTimer();
    thenHasInitialValues();
  });

  it('should be start', () => {
    givenAServiceWithRunTimerInFalse();
    whenStartTimer();
    thenTimerRunIsFalse();
  });

  it('should be start running', () => {
    givenAServiceWithRunTimerInTrue();
    whenStartTimer();
    thenTimerRunAndHasStartedAreTrue();
  });

  it('should be pause', () => {
    givenAService();
    whenPauseTimer();
    thenTimerRunIsFalse();
  });

  it('should reset', () => {
    givenAService();
    whenResetTimer();
    thenHasTimeZeroAndHasNotFinish();
  });

  function givenAService() {
    service = TestBed.inject(TimerService);
  }

  function givenAServiceWithRunTimerInFalse() {
    service = TestBed.inject(TimerService);
    service.runTimer = false;
  }

  function givenAServiceWithRunTimerInTrue() {
    service = TestBed.inject(TimerService);
    service.runTimer = true;
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  function whenInitTimer() {
    service.initTimer();
  }

  function whenStartTimer() {
    service.startTimer();
  }

  function thenTimerRunIsFalse() {
    expect(service.runTimer).toBeFalse();
  }

  function thenTimerRunAndHasStartedAreTrue() {
    expect(service.runTimer).toBeTrue();
    expect(service.hasStarted).toBeTrue();
  }

  function whenPauseTimer() {
    service.pauseTimer();
  }

  function whenResetTimer() {
    service.resetTimer();
  }

  function thenHasInitialValues() {
    expect(service.remainingTime).toBeGreaterThan(0);
    expect(service.time).toBeGreaterThan(0);
    expect(service.runTimer).toBeFalse();
    expect(service.hasStarted).toBeFalse();
    expect(service.hasFinished).toBeFalse();
  }

  function thenHasTimeZeroAndHasNotFinish() {
    expect(service.remainingTime).toBeGreaterThan(0);
    expect(service.time).toBeGreaterThan(0);
    expect(service.hasFinished).toBeFalse();
  }
});
