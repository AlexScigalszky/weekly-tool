import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BreakoutRoom } from '../models/breackout-room';
import { Nullable } from '../models/nullable';

@Injectable({
  providedIn: 'root',
})
export class BreakoutRoomsService {
  patio = 'https://meet.google.com/stw-zgec-zez';
  cafetería = 'https://meet.google.com/knv-dvzy-sgg';
  salaDeReuniones = 'https://meet.google.com/nnu-mihm-nfw';
  pisoDeAbajo = 'https://meet.google.com/ykv-kgyz-toq';
  cocina = 'https://meet.google.com/jsb-teai-zfd';
  pisoDeArriba = 'https://meet.google.com/tqr-ersq-bwy';

  private rooms: Nullable<BreakoutRoom[]> = [
    { url: this.patio, name: 'patio' },
    { url: this.cafetería, name: 'cafetería' },
    { url: this.salaDeReuniones, name: 'sala de reuniones' },
    { url: this.pisoDeAbajo, name: 'piso de abajo' },
    { url: this.cocina, name: 'cocina' },
    { url: this.pisoDeArriba, name: 'piso de arriba' },
  ];

  getRandomLink(): Observable<BreakoutRoom> {
    let urlRoom: BreakoutRoom = undefined;
    do {
      const index = Math.floor(Math.random() * 4);
      urlRoom = this.rooms[index];
    } while (urlRoom === undefined);
    return of(urlRoom);
  }

  getCountRooms(): Observable<number> {
    return of(this.rooms.length);
  }

  update(
    patio: string,
    cafeteria: string,
    salaDeReuniones: string,
    pisoDeAbajo: string,
    cocina: string,
    pisoDeArriba: string,
  ): Promise<void> {
    this.patio = patio;
    this.cafetería = cafeteria;
    this.salaDeReuniones = salaDeReuniones;
    this.pisoDeAbajo = pisoDeAbajo;
    this.cocina = cocina;
    this.pisoDeArriba = pisoDeArriba;

    this.rooms = [
      { url: this.patio, name: 'patio' },
      { url: this.cafetería, name: 'cafetería' },
      { url: this.salaDeReuniones, name: 'sala de reuniones' },
      { url: this.pisoDeAbajo, name: 'piso de abajo' },
      { url: this.cocina, name: 'cocina' },
      { url: this.pisoDeArriba, name: 'piso de arriba' },
    ];
    return new Promise<void>((resolve) => resolve());
  }
}
