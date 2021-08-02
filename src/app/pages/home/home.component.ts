import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, merge, Observable, of, race } from 'rxjs';
import { filter, map, mergeMap, share, tap } from 'rxjs/operators';
import { QuestionItemModalComponent } from 'src/app/components/question-item-modal/question-item-modal.component';
import { Nullable } from 'src/app/models/nullable';
import { Question } from 'src/app/models/question';
import { Room } from 'src/app/models/room';
import { QuestionService } from 'src/app/services/question.service';
import { TimerService } from 'src/app/services/timer.service';
import { VotingService } from 'src/app/services/voting.service';

export type ApiData = {
  room: Room;
  questions: Question[];
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  room: string = (Math.random() * 100000).toString();
  apiData$: Observable<Nullable<ApiData>> = of(null);
  questionsHighlight$: Observable<
    Question[]
  > = this.votingService.getHighlight();
  currentQuestionControl = new FormControl(null);
  itsChatTime = false;
  minutes: Nullable<number> = null;
  timeStartTime: Nullable<Date> = null;
  currentQuestion$: Observable<Question>;
  showStartButton$: Observable<boolean> = of(true);

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private votingService: VotingService,
    public dialog: MatDialog,
    private timer: TimerService
  ) {
    this.timer.onFinished().subscribe((finish: boolean) => {
      if (finish) {
        this.timer.resetTimer();
      }
    });
    this.timer.onTimerTick().subscribe((ticks: number) => {
      this.calculateMinutes();
    });
  }

  async ngOnInit(): Promise<void> {
    this.room = this.route.snapshot.paramMap.get('room') ?? 'default';

    var exists = await this.questionService.existsRooom(this.room);
    if (!exists) {
      await this.questionService.createRoom(this.room);
      console.log(`room ${this.room} created`);
    }
    this.questionService.setRoom(this.room);

    this.apiData$ = combineLatest([
      this.questionService.getRoom(this.room),
      this.questionService.list(),
    ]).pipe(
      map(([room, questions]) => ({
        room: room,
        questions: questions,
      })),
      tap((data) => this.setCurrentQuestion(data.room))
    );

    this.currentQuestion$ = this.apiData$.pipe(
      // tap(console.log),
      map((apiData) => apiData.room),
      filter((room) => room !== null),
      mergeMap((room: Room) =>
        this.questionService.getQuestion(room.currentQuestionId)
      ),
      tap(console.log)
    );

    this.showStartButton$ = combineLatest([
      this.apiData$,
      this.currentQuestionControl.valueChanges,
    ]).pipe(
      map(([apiData, currentQuestionSelected]: [ApiData, string]) => {
        if (this.timeRunning(apiData.room)) {
          return apiData.room.currentQuestionId !== currentQuestionSelected;
        } else {
          return false;
        }
      })
    );
  }

  private setCurrentQuestion(room: Room): void {
    if (this.timeRunning(room)) {
      this.timeStartTime = room.timeStartTime.toDate();
      this.timer.initTimer();
      this.timer.startTimer();
    }
    return this.currentQuestionControl.setValue(room.currentQuestionId);
  }

  private timeRunning(room: Room) {
    return (
      room.currentQuestionId !== null &&
      room.timeStartTime !== undefined &&
      room.timeStartTime !== null
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionItemModalComponent, {
      width: '50vw',
      data: new Question(),
    });

    dialogRef.afterClosed().subscribe((question) => {
      this.questionService.add(question);
      console.log(`question ${question} added in ${this.room}`);
    });
  }

  vote(question: Question): void {
    console.log(`vote`, question);
    const votesChanges = this.votingService.voteUp(question);
    if (votesChanges) {
      this.questionService.update(question);
      console.log('question updated', question);
    }
  }

  startTimer(): void {
    const questionId = this.currentQuestionControl.value;
    this.questionService.updateRoom(this.room, this.timeStartTime, questionId);
    this.timeStartTime = new Date();
  }

  diffDays = (date: Date, otherDate: Date) => {
    const diffMs = Math.abs(date.getTime() - otherDate.getTime());
    return Math.round(((diffMs % 86400000) % 3600000) / 60000);
  };

  calculateMinutes(): void {
    if (this.timeStartTime !== null) {
      this.minutes = this.diffDays(new Date(), this.timeStartTime);
      console.log('minutes', this.minutes);
    }
  }
}
