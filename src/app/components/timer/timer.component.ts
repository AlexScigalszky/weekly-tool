import { Component, Input, OnInit } from '@angular/core';
import { Nullable } from 'src/app/models/nullable';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() startTime: Date = new Date();
  minutes: Nullable<number> = null;

  constructor(private timer: TimerService) {
    this.timer.timeout = 31;
    this.timer.initTimer();
    this.timer.resetTimer();
    this.calculateMinutes();
    this.timer.onFinished().subscribe((finish: boolean) => {
      if (finish) {
        this.calculateMinutes();
        this.timer.resetTimer();
      }
    });
  }

  diffDays = (date: Date, otherDate: Date) => {
    const seconds =
      (Math.abs(date.getTime() - otherDate.getTime()) / 1000) % 60;
    return Math.ceil(seconds / 60);
  };

  calculateMinutes(): void {
    this.minutes = this.diffDays(new Date(), this.startTime);
    console.log('minutes', this.minutes);
  }
}
