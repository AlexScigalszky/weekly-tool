import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-item-modal',
  templateUrl: './question-item-modal.component.html',
  styleUrls: ['./question-item-modal.component.scss'],
})
export class QuestionItemModalComponent {
  @Input() question: Question = new Question();

  constructor(
    public dialogRef: MatDialogRef<QuestionItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public create(): void {
    this.dialogRef.close(this.question);
  }
}
