import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { flatMap, map, mergeMap, share, tap } from 'rxjs/operators';
import { QuestionItemModalComponent } from 'src/app/components/question-item-modal/question-item-modal.component';
import { Nullable } from 'src/app/models/nullable';
import { Question } from 'src/app/models/question';
import { Room } from 'src/app/models/room';
import { QuestionService } from 'src/app/services/question.service';
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
  currentQuestion$: Observable<Nullable<Question>> = of(null);
  questionsHighlight$: Observable<
    Question[]
  > = this.votingService.getHighlight();
  currentQuestion = new FormControl(null);
  itsChatTime = false;
  startTime = new Date();

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private votingService: VotingService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.room = this.route.snapshot.paramMap.get('room');

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
      tap((data) => this.currentQuestion.setValue(data.room.currentQuestionId)),
      share(),
    );

    this.currentQuestion$ = this.apiData$.pipe(
      mergeMap((data: ApiData) =>
        this.questionService.getQuestion(data.room.currentQuestionId)
      )
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
    const questionId = this.currentQuestion.value;
    this.questionService.updateRoom(this.room, new Date(), questionId);
  }
}
