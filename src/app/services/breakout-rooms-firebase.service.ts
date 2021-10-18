import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../constants';
import { BreakoutRoom } from '../models/breackout-room';
import { BreakoutRoomFirebase } from '../models/breackout-room-firebase';

@Injectable({
  providedIn: 'root',
})
export class BreakoutRoomsFirebaseService {
  // this.breackoutRoomCollectionName = `companies/${environment.companyName}/breckout-rooms/${this.roomName}`;
  roomCollectionName = `breakout-rooms`;
  roomName = 'default';
  currentFirebaseRooms$: Observable<BreakoutRoomFirebase>;
  roomCollection: AngularFirestoreCollection<BreakoutRoomFirebase>;

  constructor(private firestore: AngularFirestore) {
    this.roomCollection = this.firestore.collection<BreakoutRoomFirebase>(
      this.roomCollectionName,
    );
    this.setCurrentRoom('default');
  }

  setCurrentRoom(name: string): void {
    this.roomName = name;
    this.currentFirebaseRooms$ = this.roomCollection
      .doc<BreakoutRoomFirebase>(this.roomName)
      .valueChanges();
  }

  getRandomLink(): Observable<BreakoutRoom> {
    return this.currentFirebaseRooms$.pipe(
      map((data: BreakoutRoomFirebase) => {
        console.log({ data });
        const urls = data.rooms;
        let urlRoom: BreakoutRoom = undefined;
        do {
          const index = Math.floor(Math.random() * 4);
          urlRoom = urls[index];
        } while (urlRoom === undefined);
        return urlRoom;
      }),
    );
  }

  getCountRooms(): Observable<number> {
    return this.currentFirebaseRooms$.pipe(
      map((data) => data?.rooms?.length ?? 0),
    );
  }

  update(
    patio: string,
    cafeteria: string,
    salaDeReuniones: string,
    pisoDeAbajo: string,
    cocina: string,
    pisoDeArriba: string,
  ): Promise<void> {
    return this.roomCollection.doc<BreakoutRoomFirebase>(this.roomName).set(
      {
        ...new BreakoutRoomFirebase(),
        rooms: [
          { url: patio, name: Constants.PATIO },
          { url: cafeteria, name: 'cafetería' },
          { url: salaDeReuniones, name: 'sala de reuniones' },
          { url: pisoDeAbajo, name: 'piso de abajo' },
          { url: cocina, name: 'cocina' },
          { url: pisoDeArriba, name: 'piso de arriba' },
        ],
      },
      { merge: true },
    );
  }
}
