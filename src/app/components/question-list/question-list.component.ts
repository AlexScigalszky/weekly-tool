import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent {
  @Input() questions: Question[] = [];
  @Input() highlight: Question[] = [];
  @Output() newClicked = new EventEmitter<boolean>();
  @Output() voted = new EventEmitter<Question>();

  onNewClicked(): void {
    this.newClicked.emit(true);
  }

  vote(question: Question): void {
    this.voted.emit(question);
  }

  highlightQuestion(question): boolean {
    return this.highlight.find((x) => x.id === question.id) !== undefined;
  }
}
