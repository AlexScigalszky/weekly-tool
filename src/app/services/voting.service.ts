import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../models/question';
import { VotingSystem } from '../models/voting-system';

const KEY = 'voting-system';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  votingSystem: VotingSystem = new VotingSystem(null);
  highlightSubject = new BehaviorSubject<Question[]>([]);
  room: string = 'default';

  constructor() {
    this.loadVotingSystemFromStorage();
  }

  private loadVotingSystemFromStorage(room: string = this.room): void {
    const votingSystemExistingStr =
      localStorage.getItem(`${KEY}-${room}`) ?? '';
    console.log(`${KEY}-${room}`, { votingSystemExistingStr });
    if (votingSystemExistingStr) {
      this.votingSystem = new VotingSystem(JSON.parse(votingSystemExistingStr));
      this.saveVotingSystem(this.votingSystem);
      this.emitNewValues();
    }
  }

  setRoom(room: string): void {
    this.room = room;
    this.loadVotingSystemFromStorage(room);
  }

  voteUp(question: Question): boolean {
    const result = this.votingSystem.voteUp(question);
    this.saveVotingSystem(this.votingSystem);
    this.emitNewValues();
    return result;
  }

  voteDown(question: Question): boolean {
    const result = this.votingSystem.voteDown(question);
    this.saveVotingSystem(this.votingSystem);
    this.emitNewValues();
    return result;
  }

  saveVotingSystem(votingSystem: VotingSystem, room: string = this.room): void {
    localStorage.setItem(`${KEY}-${room}`, JSON.stringify(votingSystem));
    console.log(`Voting System saved ${KEY}-${room}`, votingSystem);
  }

  getHighlight(): Observable<Question[]> {
    return this.highlightSubject.asObservable();
  }

  private emitNewValues(): void {
    console.log('this.votingSystem.questionsUp', this.votingSystem.questionsUp);
    this.highlightSubject.next(this.votingSystem.questionsUp);
  }
}
