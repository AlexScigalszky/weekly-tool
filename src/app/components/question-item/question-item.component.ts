import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
})
export class QuestionItemComponent {
  @Input() question!: Question;
  @Input() highlight: boolean = false;
  @Output() voted = new EventEmitter<Question>();

  vote(): void {
    this.voted.emit(this.question);
  }
}
