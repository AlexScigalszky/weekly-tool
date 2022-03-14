import { Nullable } from './nullable';
import { Question } from './question';

export class Room {
  id: string = (Math.random() * 100000).toString();
  timestamp?: Date = new Date();
  currentQuestionId: Nullable<string> = null;
  timeStartTime: Date = new Date();
  questions: Question[] = [];
  ips: string[] = [];
}
