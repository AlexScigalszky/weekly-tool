import { TestBed } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initialize', () => {
    service.initTimer();

    expect(service.remainingTime).toBeGreaterThan(0);
    expect(service.time).toBeGreaterThan(0);
    expect(service.runTimer).toBeFalse();
    expect(service.hasStarted).toBeFalse();
    expect(service.hasFinished).toBeFalse();
  });
  
  it('should be start', () => {
    service.runTimer = false;
    service.startTimer();

    expect(service.runTimer).toBeFalse();
  });
  
  it('should be start running', () => {
    service.runTimer = true;
    service.startTimer();

    expect(service.runTimer).toBeTrue();
    expect(service.hasStarted).toBeTrue();
  });
  
  it('should be pause', () => {
    service.pauseTimer();

    expect(service.runTimer).toBeFalse();
  });
  
  it('should reset', () => {
    service.resetTimer();

    expect(service.remainingTime).toBeGreaterThan(0);
    expect(service.time).toBeGreaterThan(0);
    expect(service.hasFinished).toBeFalse();
  });
});
