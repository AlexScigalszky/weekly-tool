import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from '../models/question';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Room } from '../models/room';
import { catchError, first, map } from 'rxjs/operators';
import { Nullable } from '../models/nullable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questionCollectionName = `companies/${environment.companyName}/questions`;
  questionCollection: AngularFirestoreCollection<Question>;

  roomCollectionName = `companies/${environment.companyName}/rooms`;
  roomCollection: AngularFirestoreCollection<Room>;

  constructor(private firestore: AngularFirestore) {
    this.roomCollection = this.firestore.collection<Room>(
      this.roomCollectionName,
    );
    this.setRoom('default');
  }

  setRoom(room: string): void {
    this.questionCollectionName = `companies/${environment.companyName}/rooms/${room}/questions`;
    this.questionCollection = this.firestore.collection<Question>(
      this.questionCollectionName,
      this.orderByRelevance,
    );
  }

  orderByRelevance = (ref: any) => ref.orderBy('votes');

  list(): Observable<Question[]> {
    return this.questionCollection
      .valueChanges()
      .pipe(map((questions: Question[]) => questions.reverse()));
  }

  add(question: Question): void {
    const id = this.firestore.createId();
    question = {
      ...question,
      id,
    };
    this.questionCollection.doc(id).set(question);
  }

  getRoom(roomName: string): Observable<Room> {
    return this.roomCollection.doc<Room>(roomName).valueChanges();
  }

  update(question: Question): Promise<void> {
    return this.questionCollection
      .doc(question.id)
      .set(question, { merge: true });
  }

  async existsRooom(room: string): Promise<boolean> {
    var docRef = this.roomCollection.doc(room);

    var doc = await docRef.get().toPromise();
    return doc.exists;
  }

  async createRoom(room: string): Promise<Room> {
    const newRoom: Room = {
      ...new Room(),
      id: room,
    };
    return await this.roomCollection
      .doc(`${newRoom.id}`)
      .set(newRoom)
      .then(() => newRoom);
  }

  getQuestion(currentQuestionId: string): Observable<Nullable<Question>> {
    if (!currentQuestionId) {
      return of(null);
    }
    return this.questionCollection
      .doc<Question>(currentQuestionId)
      .valueChanges()
      .pipe(
        catchError((err: any) => {
          console.error(`Question ${currentQuestionId} not found`);
          return of(null);
        }),
      );
  }

  updateRoom(
    room: string,
    timeStartTime: Date,
    questionId: string,
  ): Promise<any> {
    return this.roomCollection
      .doc(room)
      .update({
        timeStartTime: timeStartTime,
        currentQuestionId: questionId,
      })
      .then(() => console.log(`timer set ${timeStartTime}`));
  }

  resetVotes(room: string, questions: Question[]) {
    questions
      .map((question) => ({
        ...question,
        votes: 0,
      }))
      .forEach(async (question) => await this.update(question));
  }

  async addIpAdress(roomName: string, ipAddess: string): Promise<void> {
    const room = await this.roomCollection
      .doc<Room>(roomName)
      .valueChanges()
      .pipe(first())
      .toPromise();
    if (!room) {
      return;
    }
    return await this.roomCollection
      .doc(roomName)
      .update({
        ips: [...(room.ips ?? []), ipAddess],
      })
      .then(() => console.log(`ip address added ${ipAddess}`));
  }

  async removeIpAdress(roomName: string, ipAddess: string): Promise<void> {
    const room = await this.roomCollection
      .doc<Room>(roomName)
      .valueChanges()
      .pipe(first())
      .toPromise();
    if (!room) {
      return;
    }
    return await this.roomCollection
      .doc(roomName)
      .update({
        ips: [...(room.ips ?? []).filter((x) => x != ipAddess)],
      })
      .then(() => console.log(`ip address added ${ipAddess}`));
  }
}
