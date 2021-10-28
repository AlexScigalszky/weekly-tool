import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/models/question';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-question-item-modal',
  templateUrl: './question-item-modal.component.html',
  styleUrls: ['./question-item-modal.component.scss'],
})
export class QuestionItemModalComponent implements OnInit, OnDestroy {
  @Input() question: Question = new Question();
  editor: Editor;

  constructor(
    public dialogRef: MatDialogRef<QuestionItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question,
  ) {
    this.question = data;
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public create(): void {
    this.dialogRef.close(this.question);
  }
}
