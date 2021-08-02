import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Question } from '../models/question';
import { VotingSystem } from '../models/voting-system';

const KEY = 'voting-system';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  votingSystem: VotingSystem = new VotingSystem(null);
  highlightSubject = new BehaviorSubject<Question[]>([]);

  constructor() {
    const votingSystemExistingStr = localStorage.getItem(KEY) ?? '';
    console.log({votingSystemExistingStr});
    if (votingSystemExistingStr) {
      this.votingSystem = new VotingSystem(JSON.parse(votingSystemExistingStr));
      this.emitNewValues();
    }
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

  saveVotingSystem(votingSystem: VotingSystem): void {
    localStorage.setItem(KEY, JSON.stringify(votingSystem));
  }

  getHighlight(): Observable<Question[]> {
    return this.highlightSubject.asObservable().pipe(distinctUntilChanged());
  }

  private emitNewValues(): void {
    console.log('this.votingSystem.questionsUp', this.votingSystem.questionsUp);
    this.highlightSubject.next(this.votingSystem.questionsUp);
  }
}
