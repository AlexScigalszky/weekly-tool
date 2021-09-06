import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  static TIMEOUT_SECONDS = 18000; // 60 * 30 *10
  timeout = TimerService.TIMEOUT_SECONDS;
  time: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  remainingTime: number;
  private finishedSubject = new BehaviorSubject<boolean>(null);
  private onTimerTickSubject = new BehaviorSubject<number>(null);

  initTimer() : void{
    this.remainingTime = this.timeout;
    this.time = this.remainingTime;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.finishedSubject.next(this.hasFinished);
  }

  startTimer() : void{
    if (this.runTimer) {
      this.runTimer = true;
      this.hasStarted = true;
      this.timerTick();
    }
  }

  pauseTimer() : void {
    this.runTimer = false;
  }

  resetTimer() : void{
    this.remainingTime = this.timeout;
    this.onTimerTickSubject.next(this.remainingTime);
    this.time = this.remainingTime;
    if (this.hasFinished) {
      this.initTimer();
    }
    if (!this.runTimer) {
      this.hasFinished = false;
      this.finishedSubject.next(this.hasFinished);
      this.startTimer();
    }
  }

  resumeTimer(): void {
    this.startTimer();
  }

  onFinished(): Observable<boolean> {
    return this.finishedSubject.asObservable();
  }

  onTimerTick() {
    return this.onTimerTickSubject.asObservable();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) {
        return;
      }
      this.remainingTime--;
      this.onTimerTickSubject.next(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      } else {
        this.hasFinished = true;
        this.finishedSubject.next(true);
      }
    }, 1000);
  }

  setTimeout(seconds: number) {
    this.timeout = seconds;
  }
}
