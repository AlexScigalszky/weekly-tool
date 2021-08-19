import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewRoomModalComponent } from './components/new-room-modal/new-room-modal.component';
import { QuestionService } from './services/question.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public dialog: MatDialog, private questions: QuestionService) {}

  async newRoom() {
    const dialogRef = this.dialog.open(NewRoomModalComponent, {
      width: '25vw',
      data: {},
    });

    const roomName = await dialogRef.afterClosed().toPromise();
    if (roomName === undefined) {
      return;
    }
    console.log('roomName', roomName);
    this.questions.getRoom(roomName).subscribe((room) => {
      if (room !== undefined) {
        console.log(`room ${room.id} already exist`);
      } else {
        window.open(`/${roomName}`, '_blank');
      }
    });
  }
}
