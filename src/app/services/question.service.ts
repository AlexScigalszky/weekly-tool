import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Room } from '../models/room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questionCollectionName = 'questions';
  questionCollection: AngularFirestoreCollection<Question>;

  roomCollectionName = 'rooms';
  roomCollection: AngularFirestoreCollection<Room>;

  constructor(private firestore: AngularFirestore) {
    this.roomCollection = this.firestore.collection<Room>(
      this.roomCollectionName
    );
    this.setRoom('default');
  }

  setRoom(room: string): void {
    this.questionCollectionName = `rooms/${room}/questions`;
    this.questionCollection = this.firestore.collection<Question>(
      this.questionCollectionName,
      this.orderByRelevance
    );
  }

  orderByRelevance = (ref) => ref.orderBy('votes');

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

  update(question: Question) {
    this.questionCollection.doc(question.id).set(question, { merge: true });
  }

  async existsRooom(room: string): Promise<boolean> {
    var docRef = this.firestore.collection('rooms').doc(room);

    var doc = await docRef.get().toPromise();
    return doc.exists;
  }

  async createRoom(room: string): Promise<Room> {
    const newRoom: Room = {
      id: room,
      questions: [],
    };

    return this.roomCollection
      .doc(newRoom.id)
      .set(newRoom)
      .then(() => newRoom);
  }
}
