import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants';
import { BreakoutRoom } from '../models/breackout-room';
import { BreakoutRoomFirebase } from '../models/breackout-room-firebase';
import { Balancer } from '../utils/balancer';

@Injectable({
  providedIn: 'root',
})
export class BreakoutRoomsFirebaseService {
  roomName = 'default';
  roomDocumentName = `companies/${environment.companyName}/breakout-rooms/${this.roomName}`;
  roomsLinksCollectionName = `${this.roomDocumentName}/rooms`;
  currentFirebaseRooms$: Observable<BreakoutRoomFirebase>;
  balancer = new Balancer();

  constructor(private firestore: AngularFirestore) {
    this.setCurrentRoom('default');
  }

  async setCurrentRoom(name: string): Promise<void> {
    this.roomName = name;
    this.roomDocumentName = `companies/${environment.companyName}/breakout-rooms/${this.roomName}`;
    this.roomsLinksCollectionName = `${this.roomDocumentName}/rooms`;
    this.currentFirebaseRooms$ = this.firestore
      .doc<BreakoutRoomFirebase>(this.roomDocumentName)
      .valueChanges();
    const doc = await this.firestore
      .doc<BreakoutRoomFirebase>(this.roomDocumentName)
      .get()
      .toPromise();
    if (!doc.exists) {
      await this.createRoom();
      console.log('room created');
    }
  }

  createRoom(): Promise<BreakoutRoomFirebase> {
    const newRoom: BreakoutRoomFirebase = {
      ...new BreakoutRoomFirebase(),
      id: this.roomName,
      name: this.roomName,
    };
    return this.firestore
      .collection<BreakoutRoomFirebase>(
        `companies/${environment.companyName}/breakout-rooms`,
      )
      .doc(`${newRoom.id}`)
      .set(newRoom)
      .then(() => newRoom);
  }

  getRandomLink(): Observable<BreakoutRoom> {
    return this.firestore
      .doc(this.roomDocumentName)
      .valueChanges()
      .pipe(
        map((room: BreakoutRoomFirebase) => room.rooms),
        map((rooms: BreakoutRoom[]) => this.balancer.extractRandomLink(rooms)),
      );
  }

  getCountRooms(): Observable<number> {
    return this.firestore
      .doc(this.roomDocumentName)
      .valueChanges()
      .pipe(
        map((room: BreakoutRoomFirebase) => room.rooms),
        map((rooms) => rooms?.length ?? 0),
      );
  }

  async plusOneParticipant(room: BreakoutRoom): Promise<void> {
    const breakout = await this.firestore
      .doc<BreakoutRoomFirebase>(this.roomDocumentName)
      .get()
      .toPromise()
      .then((x) => x.data() as BreakoutRoomFirebase);
    for (const roomFirebase of breakout.rooms) {
      if (roomFirebase.name === room.name) {
        roomFirebase.participants++;
      }
    }
    return this.firestore
      .doc<BreakoutRoomFirebase>(this.roomDocumentName)
      .set(breakout);
  }

  update(
    patio: string,
    cafeteria: string,
    salaDeReuniones: string,
    pisoDeAbajo: string,
    cocina: string,
    pisoDeArriba: string,
  ): Promise<void> {
    return this.firestore.doc<BreakoutRoomFirebase>(this.roomDocumentName).set(
      {
        ...new BreakoutRoomFirebase(),
        rooms: [
          { url: patio, name: Constants.PATIO, participants: 0 },
          { url: cafeteria, name: 'cafetería', participants: 0 },
          {
            url: salaDeReuniones,
            name: 'sala de reuniones',
            participants: 0,
          },
          { url: pisoDeAbajo, name: 'piso de abajo', participants: 0 },
          { url: cocina, name: 'cocina', participants: 0 },
          { url: pisoDeArriba, name: 'piso de arriba', participants: 0 },
        ],
      },
      { merge: true },
    );
  }
}
