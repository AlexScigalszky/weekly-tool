import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { repeat } from 'rxjs/operators';
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerMockService {
  // static TIMEOUT_SECONDS = 18000; // 60 * 30 *10
  // timeout = TimerService.TIMEOUT_SECONDS;
  // time: number;
  // runTimer: boolean;
  // hasStarted: boolean;
  // hasFinished: boolean;
  // remainingTime: number;
  // private finishedSubject = new BehaviorSubject<boolean>(null);
  // private onTimerTickSubject = new BehaviorSubject<number>(null);

  // constructor() {}

  // initTimer() {
  //   this.remainingTime = this.timeout;
  //   this.time = this.remainingTime;
  //   this.runTimer = false;
  //   this.hasStarted = false;
  //   this.hasFinished = false;
  //   this.finishedSubject.next(this.hasFinished);
  // }

  // startTimer() {
  //   if (this.runTimer) {
  //     this.runTimer = true;
  //     this.hasStarted = true;
  //     this.timerTick();
  //   }
  // }

  // pauseTimer() {
  //   this.runTimer = false;
  // }

  resetTimer(): void {}
  // resetTimer() {
  //   this.remainingTime = this.timeout;
  //   this.onTimerTickSubject.next(this.remainingTime);
  //   this.time = this.remainingTime;
  //   if (this.hasFinished) {
  //     this.initTimer();
  //   }
  //   if (!this.runTimer) {
  //     this.hasFinished = false;
  //     this.finishedSubject.next(this.hasFinished);
  //     this.startTimer();
  //   }
  // }

  // resumeTimer() {
  //   this.startTimer();
  // }

  onFinished(): Observable<boolean> {
    return of(true);
  }

  onTimerTick(): Observable<number> {
    return of(1).pipe(repeat(5));
  }

  // timerTick() {
  //   setTimeout(() => {
  //     if (!this.runTimer) {
  //       return;
  //     }
  //     this.remainingTime--;
  //     this.onTimerTickSubject.next(this.remainingTime);
  //     if (this.remainingTime > 0) {
  //       this.timerTick();
  //     } else {
  //       this.hasFinished = true;
  //       this.finishedSubject.next(true);
  //     }
  //   }, 1000);
  // }

  // setTimeout(seconds: number) {
  //   this.timeout = seconds;
  // }
}
