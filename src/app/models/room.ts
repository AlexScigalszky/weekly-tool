import { Question } from './question';

export class Room {
  id: string = (Math.random() * 100000).toString();
  timestamp?: Date = new Date();
  questions: Question[] = [];
}
