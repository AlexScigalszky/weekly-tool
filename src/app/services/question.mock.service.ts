import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Question } from '../models/question';
import { Nullable } from '../models/nullable';

@Injectable({
  providedIn: 'root',
})
export class QuestionMockService {
  setRoom(room: string): void {
    console.log('setRoom');
  }

  list(): Observable<Question[]> {
    console.log('list');
    return of([]).pipe(delay(300));
  }

  getRoom(roomName: string): Observable<Room> {
    console.log('getRoom');
    return of({
      ...new Room(),
      id: roomName,
    }).pipe(delay(200), tap(console.log));
  }

  async existsRooom(_: string): Promise<boolean> {
    console.log('existsRooom');
    return new Promise((r) => r(false));
  }

  async createRoom(room: string): Promise<Room> {
    console.log('createRoom');
    return new Promise((r) =>
      r({
        ...new Room(),
        id: room,
      }),
    );
  }

  getQuestion(currentQuestionId: string): Observable<Nullable<Question>> {
    const question = new Question();
    question.id = currentQuestionId;
    return of(question);
  }
}
