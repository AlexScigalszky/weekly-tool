import { TestBed } from '@angular/core/testing';
import { Question } from '../models/question';
import { VotingSystem } from '../models/voting-system';

import { VotingService } from './voting.service';

describe('VotingService', () => {
  let service: VotingService;
  let newVotingSystem: VotingSystem;
  let questionOne: Question;
  let questionTwo: Question;
  let store: {
    'voting-system-new': string;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  it('voting system property should be exists', () => {
    givenAService();
    thenHaveVotingSystem();
  });

  it('should start with default values', (done: DoneFn) => {
    givenAService();
    thenHaveDefaultRoom();
    thenHaveNotHighlightedQuestion(done);
  });

  it('should change room name', () => {
    givenAService();
    whenSetNewRoomName();
    thenHaveNewRoomName();
    thenHaveVotingSystem();
  });

  it('should change room name', (done: DoneFn) => {
    givenAService();
    whenSetNewRoomName();
    thenHaveZeroHighlightedQuestion(done);
  });

  it('vote question one', (done: DoneFn) => {
    givenAService();
    const result = whenVoteQuestionOne();
    thenReturnTrue(result);
    thenHaveOneHighlightedQuestion(done);
  });

  it('vote question two', (done: DoneFn) => {
    givenAServiceWithQuestionOneVoted();
    const result = whenVoteQuestionTwo();
    thenReturnTrue(result);
    thenHaveTwoHighlightedQuestion(done);
  });

  it('vote up repeated and expect vote down', (done: DoneFn) => {
    givenAServiceWithQuestionOneVoted();
    const result = whenVoteQuestionOne();
    thenReturnTrue(result);
    thenHaveNotHighlightedQuestion(done);
  });

  function givenAService() {
    service = new VotingService();
    newVotingSystem = new VotingSystem();
    questionOne = {
      id: 'question-1',
      name: 'name',
      votes: 0,
      title: 'title1',
      description: 'description1',
    };
    questionTwo = {
      id: 'question-2',
      name: 'name',
      votes: 0,
      title: 'title2',
      description: 'description2',
    };
    newVotingSystem.questionsUp = [];
    store = {
      'voting-system-new': JSON.stringify(newVotingSystem),
    };
    localStorage.setItem(`voting-system-default`, null);
    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake(
      (key, value) => (store[key] = value + ''),
    );
    localStorage.clear();
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  function thenHaveVotingSystem() {
    expect(service.votingSystem).toBeTruthy();
  }

  function thenHaveDefaultRoom() {
    expect(service.room == 'default').toBeTruthy();
  }

  function thenHaveNotHighlightedQuestion(done: DoneFn) {
    service.highlightSubject.subscribe((value) => {
      expect(value).toEqual([]);
      done();
    });
  }

  function whenSetNewRoomName() {
    service.setRoom('new');
  }

  function thenHaveNewRoomName() {
    expect(service.room == 'new').toBeTruthy();
  }

  function thenHaveZeroHighlightedQuestion(done: DoneFn) {
    service.highlightSubject.subscribe((value) => {
      expect(value.length).toEqual(0);
      done();
    });
  }

  function whenVoteQuestionOne(): boolean {
    return service.voteUp(JSON.parse(JSON.stringify(questionOne)));
  }

  function whenVoteQuestionTwo(): boolean {
    return service.voteUp(questionTwo);
  }

  function thenReturnTrue(result: boolean) {
    expect(result).toBeTrue();
  }

  function thenHaveOneHighlightedQuestion(done: DoneFn) {
    service.highlightSubject.subscribe((value) => {
      expect(value.length).toEqual(1);
      const question1 = value.find((x) => x.id === questionOne.id);
      expect(question1.votes).toBeGreaterThanOrEqual(1);
      done();
    });
  }

  function givenAServiceWithQuestionOneVoted() {
    service = new VotingService();
    newVotingSystem = new VotingSystem();
    questionOne = {
      id: 'question-1',
      name: 'name',
      votes: 0,
      title: 'title1',
      description: 'description1',
    };
    questionTwo = {
      id: 'question-2',
      name: 'name',
      votes: 0,
      title: 'title2',
      description: 'description2',
    };
    newVotingSystem.questionsUp = [];
    store = {
      'voting-system-new': JSON.stringify(newVotingSystem),
    };
    spyOn(localStorage, 'getItem').and.callFake((key) => store[key]);
    spyOn(localStorage, 'setItem').and.callFake(
      (key, value) => (store[key] = value + ''),
    );
    localStorage.clear();
    service.voteUp(JSON.parse(JSON.stringify(questionOne)));
  }

  function thenHaveTwoHighlightedQuestion(done: DoneFn) {
    service.highlightSubject.subscribe((value) => {
      expect(value.length).toEqual(2);
      const question2 = value.find((x) => x.id === questionTwo.id);
      expect(question2.votes).toEqual(1);
      done();
    });
  }
});
