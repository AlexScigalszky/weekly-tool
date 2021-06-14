import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QuestionItemModalComponent } from 'src/app/components/question-item-modal/question-item-modal.component';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { VotingService } from 'src/app/services/voting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  room: string = (Math.random() * 100000).toString();
  questions$: Observable<Question[]> = of([]);
  questionsHighlight$: Observable<Question[]> = this.votingService.getHighlight().pipe(
    tap(console.error)
  );

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
    this.questions$ = this.questionService.list().pipe(tap(console.log));
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
}
