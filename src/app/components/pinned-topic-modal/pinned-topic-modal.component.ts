import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import { PinnedItem } from 'src/app/models/pinned-item';

@Component({
  selector: 'wt-pinned-topic-modal',
  templateUrl: './pinned-topic-modal.component.html',
  styleUrls: ['./pinned-topic-modal.component.scss'],
})
export class PinnedTopicModalComponent implements OnInit, OnDestroy {
  @Input() pinnedTopics: string = '';
  editor: Editor;

  constructor(
    public dialogRef: MatDialogRef<PinnedTopicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PinnedItem[],
  ) {
    this.pinnedTopics = data.length > 0 ? data[0].text : '';
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
    this.dialogRef.close(this.pinnedTopics);
  }
}
