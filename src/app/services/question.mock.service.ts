import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Question } from '../models/question';
import { Nullable } from '../models/nullable';

@Injectable({
  providedIn: 'root',
})
export class QuestionMockService {
  setRoom(room: string): void {}

  list(): Observable<Question[]> {
    return of([new Question()]).pipe(delay(30));
  }

  getRoom(roomName: string): Observable<Room> {
    return of({
      ...new Room(),
      id: roomName,
    }).pipe(delay(200));
  }

  async existsRooom(_: string): Promise<boolean> {
    return new Promise((r) => r(false));
  }

  async createRoom(room: string): Promise<Room> {
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
