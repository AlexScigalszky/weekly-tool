import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { delay, filter, first, map, mergeMap, tap } from 'rxjs/operators';
import { QuestionItemModalComponent } from 'src/app/components/question-item-modal/question-item-modal.component';
import { Nullable } from 'src/app/models/nullable';
import { Question } from 'src/app/models/question';
import { Room } from 'src/app/models/room';
import { QuestionService } from 'src/app/services/question.service';
import { TimerService } from 'src/app/services/timer.service';
import { VotingService } from 'src/app/services/voting.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { PartnersService } from 'src/app/services/partners.service';
import { AniversariesService } from 'src/app/services/aniversaries.service';
import { SectionsAvaliablesService } from 'src/app/services/sections-avaliables.service';
import { RetroService } from 'src/app/retro/services/retro.service';
import { PinnedTopicsService } from 'src/app/services/pinned-topics.service';
import { PinnedItem } from 'src/app/models/pinned-item';
import { SimpsonService } from 'src/app/services/simpson.service';
import { ClientIpService } from 'src/app/services/client-ip.service';

export type ApiData = {
  room: Room;
  questions: Question[];
  totalVotes: number;
  countUsers: number;
};

@Component({
  selector: 'wt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  room: string = (Math.random() * 100000).toString();
  apiData$: Observable<Nullable<ApiData>> = of(null);
  questionsHighlight$: Observable<Question[]> =
    this.votingService.getHighlight();
  currentQuestionControl = new FormControl(null);
  itsChatTime = false;
  minutes: Nullable<number> = null;
  timeStartTime: Nullable<Date> = null;
  currentQuestion$: Observable<Question>;
  showStartButton$: Observable<boolean> = of(true);
  aniversaries$ = this.partnersService
    .list()
    .pipe(map((x) => this.aniversariesService.getWhoHaveAnAniversary(x)));
  pinned$: Observable<PinnedItem[]>;
  simpsonQuote = this.simpsonService.getOne();
  ipAddess: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private votingService: VotingService,
    public dialog: MatDialog,
    private timer: TimerService,
    private partnersService: PartnersService,
    private aniversariesService: AniversariesService,
    public sections: SectionsAvaliablesService,
    private retroService: RetroService,
    public pinnedService: PinnedTopicsService,
    private simpsonService: SimpsonService,
    private clientIpService: ClientIpService,
  ) {
    this.timer.onFinished().subscribe((finish: boolean) => {
      if (finish) {
        this.timer.resetTimer();
      }
    });
    this.timer.onTimerTick().subscribe((ticks: number) => {
      this.calculateMinutes();
    });
    // this.partnersService.updateList();
    const ayearago = new Date();
    ayearago.setFullYear(ayearago.getFullYear() - 1);
    this.clientIpService
      .getClientIp()
      .pipe(first())
      .subscribe((ip) => {
        this.ipAddess = ip;
      });
  }

  async ngOnInit(): Promise<void> {
    this.room = this.route.snapshot.params.room ?? 'default';

    var exists = await this.questionService.existsRooom(this.room);
    if (!exists) {
      await this.questionService.createRoom(this.room);
      console.log(`room ${this.room} created`);
    }
    this.questionService.setRoom(this.room);
    this.votingService.setRoom(this.room);
    this.retroService.setRoom(this.room);
    this.pinnedService.setRoom(this.room);

    this.apiData$ = combineLatest([
      this.questionService.getRoom(this.room),
      this.questionService.list(),
    ]).pipe(
      delay(1000),
      map(([room, questions]) => ({
        room: room,
        questions: questions,
        totalVotes: questions.reduce(
          (total: number, question: Question) => (total += question.votes),
          0,
        ),
        countUsers: (room.ips ?? []).length,
      })),
      tap((data) => console.log('refresh room', data)),
      tap((data) => this.setCurrentQuestion(data.room)),
    );

    this.currentQuestion$ = this.apiData$.pipe(
      map((apiData) => apiData.room),
      filter((room) => room !== null),
      mergeMap((room: Room) =>
        this.questionService.getQuestion(room.currentQuestionId),
      ),
    );

    this.showStartButton$ = combineLatest([
      this.apiData$,
      this.currentQuestionControl.valueChanges,
    ]).pipe(
      map(([apiData, currentQuestionSelected]: [ApiData, string]) => {
        return apiData.room.currentQuestionId !== currentQuestionSelected;
      }),
    );

    this.pinned$ = this.pinnedService.list().pipe(
      map((topis) => topis.filter((x) => this.IsHtmlEmpty(x.text))),

      // filter((x) =>
      //   x.every((y) => {
      //     return (
      //       new DOMParser()
      //         .parseFromString(y.text, 'text/html')
      //         .body.textContent.trim() !== ''
      //     );
      //   }),
      // ),
      map((x) => (x.length == 0 ? null : [x[0]])),
    );
  }

  private setCurrentQuestion(room: Room): void {
    if (this.timeRunning(room)) {
      console.log(`room.timeStartTime ${room.timeStartTime}`);
      if (room.timeStartTime.toString().includes('Timestamp')) {
        this.timeStartTime = new Date(
          (room.timeStartTime as Timestamp).seconds * 1000,
        );
      } else {
        this.timeStartTime = new Date(room.timeStartTime);
      }

      this.timer.initTimer();
      this.timer.startTimer();
      this.calculateMinutes();
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
    const dialogRef = this.openQuestionModal(new Question());

    dialogRef.afterClosed().subscribe((question) => {
      this.questionService.add(question);
      console.log(`question ${question} added in ${this.room}`);
    });
  }

  private openQuestionModal(question: Question): MatDialogRef<any> {
    return this.dialog.open(QuestionItemModalComponent, {
      width: '50vw',
      data: question,
    });
  }

  async vote(
    question: Question,
    questionsHighlight: Question[],
  ): Promise<void> {
    console.log(`vote`, question);
    const exists = questionsHighlight.some((x) => x.id == question.id);
    let votesChanges = false;
    if (exists) {
      votesChanges = this.votingService.voteDown(question);
      await this.questionService.removeIpAdress(this.room, this.ipAddess);
    } else {
      votesChanges = this.votingService.voteUp(question);
      await this.questionService.addIpAdress(this.room, this.ipAddess);
    }

    if (votesChanges) {
      this.questionService
        .update(question)
        .then(() => console.log('question updated', question));
    }
  }

  async startTimer(): Promise<void> {
    const questionId = this.currentQuestionControl.value;
    this.timeStartTime = new Date();
    await this.questionService.updateRoom(
      this.room,
      this.timeStartTime,
      questionId,
    );
    this.calculateMinutes();
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

  resetVotes(questions: Question[]): void {
    if (
      confirm('¿estás seguro de querer eliminar todos los votos?') &&
      prompt('Ingresa la clave para validar esto') === 'cS4vRT66fp6I'
    ) {
      this.questionService.resetVotes(this.room, questions);
    }
  }

  editQuestion(question: Question): void {
    const dialogRef = this.openQuestionModal(
      JSON.parse(JSON.stringify(question)),
    );

    dialogRef.afterClosed().subscribe((question) => {
      this.questionService
        .update(question)
        .then(() => console.log('question updated', question));
    });
  }

  IsHtmlEmpty(text: string): boolean {
    return (
      new DOMParser()
        .parseFromString(text, 'text/html')
        .body.textContent.trim() !== ''
    );
  }
}
