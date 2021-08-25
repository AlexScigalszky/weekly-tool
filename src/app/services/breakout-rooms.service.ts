import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakoutRoomsService {
  rooms: string[] = [
    'https://meet.google.com/cjx-stse-neb',
    'https://meet.google.com/erh-dcbr-day',
    'https://meet.google.com/mcg-vmtq-mzm',
    'https://meet.google.com/stm-zcuk-woi',
  ];

  getRandomLink(): string {
    let urlRoom: string = undefined;
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
