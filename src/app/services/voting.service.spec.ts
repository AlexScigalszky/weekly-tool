import { TestBed } from '@angular/core/testing';
import { VotingSystem } from '../models/voting-system';

import { VotingService } from './voting.service';

describe('VotingService', () => {
  let service: VotingService;
  let newVotingSystem = new VotingSystem();
  let questionOne = {
    id: 'question-1',
    name: 'name',
    votes: 0,
    title: 'title1',
    description: 'description1',
  };
  let questionTwo = {
    id: 'question-2',
    name: 'name',
    votes: 0,
    title: 'title2',
    description: 'description2',
  };
  newVotingSystem.questionsUp = [];
  let store = {
    'voting-system-new': JSON.stringify(newVotingSystem),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new VotingService();
    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake(
      (key, value) => (store[key] = value + ''),
    );
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('voting system property should be exists', () => {
    expect(service.votingSystem).toBeTruthy();
  });

  it('should start with default values', (done: DoneFn) => {
    expect(service.room == 'default').toBeTruthy();
    // expect(
    //   store['voting-system-default']
    // ).toBeTruthy();
    service.highlightSubject.subscribe((value) => {
      expect(value).toEqual([]);
      done();
    });
  });

  it('should create a new VotingSystem for new room', () => {
    expect(service.room == 'default').toBeTruthy();
  });

  it('should change room name', () => {
    service.setRoom('new');
    expect(service.room == 'new').toBeTruthy();
    expect(service.votingSystem).toBeTruthy();
  });

  it('should change room name', (done: DoneFn) => {
    service.setRoom('new');
    service.highlightSubject.subscribe((value) => {
      expect(value.length).toEqual(0);
      done();
    });
  });

  it('vote question one', (done: DoneFn) => {
    const result = service.voteUp(JSON.parse(JSON.stringify(questionOne)));
    expect(result).toBeTrue();
    service.highlightSubject.subscribe((value) => {
      expect(value.length).toEqual(1);
      const question1 = value.find(x => x.id === questionOne.id);
      expect(question1.votes).toEqual(1)
      done();
    });
  });

  it('vote question two', (done: DoneFn) => {
    service.voteUp(JSON.parse(JSON.stringify(questionOne)));
    const result = service.voteUp(questionTwo);
    expect(result).toBeTrue();
    service.highlightSubject.subscribe((value) => {
      expect(value.length).toEqual(2);
      const question2 = value.find(x => x.id === questionTwo.id);
      expect(question2.votes).toEqual(1)
      done();
    });
  });

  it('vote up repeated and expect vote down', (done: DoneFn) => {
    service.voteUp(JSON.parse(JSON.stringify(questionOne)));
    const result = service.voteUp(JSON.parse(JSON.stringify(questionOne)));
    expect(result).toBeTrue();
    service.highlightSubject.subscribe((value) => {
      expect(value.length).toEqual(0);
      done();
    });
  });

});
