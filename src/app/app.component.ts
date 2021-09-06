import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // constructor(public dialog: MatDialog) {}
  // async newRoom() {
  //   const dialogRef = this.dialog.open(NewRoomModalComponent, {
  //     width: '25vw',
  //     data: {},
  //   });
  //   const roomName = await dialogRef.afterClosed().toPromise();
  //   if (roomName === undefined) {
  //     return;
  //   }
  //   console.log('roomName', roomName);
  //   this.questions.getRoom(roomName).subscribe((room) => {
  //     if (room !== undefined) {
  //       console.log(`room ${room.id} already exist`);
  //     } else {
  //       window.open(`/${roomName}`, '_blank');
  //     }
  //   });
  // }
}
