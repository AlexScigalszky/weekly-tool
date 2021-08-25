import { Component, OnInit } from '@angular/core';
import { BreakoutRoom } from 'src/app/models/breackout-room';
import { BreakoutRoomsService } from 'src/app/services/breakout-rooms.service';

@Component({
  selector: 'app-breakout-rooms',
  templateUrl: './breakout-rooms.component.html',
  styleUrls: ['./breakout-rooms.component.scss'],
})
export class BreakoutRoomsComponent implements OnInit {
  urlRoom: BreakoutRoom = this.breakoutRooms.getRandomLink();
  countRooms = this.breakoutRooms.getCountRooms();
  showLink = false;
  message = 'Creando salas';

  constructor(private breakoutRooms: BreakoutRoomsService) {}

  ngOnInit(): void {
    setTimeout(() => (this.message = 'Seleccionando sala al azar'), 500);
    setTimeout(() => (this.showLink = true), 1000);
  }
}
