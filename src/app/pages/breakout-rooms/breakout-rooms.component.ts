import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BreakoutRoom } from 'src/app/models/breackout-room';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';

@Component({
  selector: 'app-breakout-rooms',
  templateUrl: './breakout-rooms.component.html',
  styleUrls: ['./breakout-rooms.component.scss'],
})
export class BreakoutRoomsComponent implements OnInit {
  urlRoom$: Observable<BreakoutRoom> = this.breakoutRooms
    .getRandomLink()
    .pipe(delay(1500));
  countRooms$: Observable<number> = this.breakoutRooms.getCountRooms();
  message = 'Creando salas';

  constructor(private breakoutRooms: BreakoutRoomsFirebaseService) {}

  ngOnInit(): void {
    setTimeout(() => (this.message = 'Seleccionando sala al azar'), 500);
  }
}
