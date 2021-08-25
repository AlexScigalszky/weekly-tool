import { Injectable } from '@angular/core';
import { BreakoutRoom } from '../models/breackout-room';
import { Nullable } from '../models/nullable';

@Injectable({
  providedIn: 'root',
})
export class BreakoutRoomsService {
  rooms: Nullable<BreakoutRoom[]> = [
    { url: 'https://meet.google.com/stw-zgec-zez', name: 'patio' },
    { url: 'https://meet.google.com/knv-dvzy-sgg', name: 'cafetería' },
    { url: 'https://meet.google.com/nnu-mihm-nfw', name: 'sala de reuniones' },
    { url: 'https://meet.google.com/ykv-kgyz-toq', name: 'piso de abajo' },
    { url: 'https://meet.google.com/jsb-teai-zfd', name: 'cocina' },
    { url: 'https://meet.google.com/tqr-ersq-bwy', name: 'piso de arriba' },
  ];

  getRandomLink(): BreakoutRoom {
    let urlRoom: BreakoutRoom = undefined;
    do {
      const index = Math.floor(Math.random() * 4);
      urlRoom = this.rooms[index];
    } while (urlRoom === undefined);
    return urlRoom;
  }

  getCountRooms(): number {
    return this.rooms.length;
  }
}
