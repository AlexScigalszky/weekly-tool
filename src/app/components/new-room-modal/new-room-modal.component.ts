import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'wt-new-room-modal',
  templateUrl: './new-room-modal.component.html',
  styleUrls: ['./new-room-modal.component.scss'],
})
export class NewRoomModalComponent {
  title: string;

  constructor(public dialogRef: MatDialogRef<NewRoomModalComponent>) {
    const d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    this.title = `${ye}-${mo}-${da}`;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public create(): void {
    this.dialogRef.close(this.title);
  }
}
