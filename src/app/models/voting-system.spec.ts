import { TestBed } from '@angular/core/testing';

import { VotingSystem } from './voting-system';

describe('VotingSystem', () => {
  const newVotingSystem = new VotingSystem();
  let service;
  let questionOne = {
    id: 'question-1',
    name: 'name',
    votes: 0,
    title: 'title1',
    description: 'description1',
  };
  newVotingSystem.questionsUp = [questionOne];
  newVotingSystem.maxVotesAvaliables = 32;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created ', () => {
    givenAService();
    thenExists();
  });

  it('should be created with default values', () => {
    givenAService();
    thenHaveMaxVotesAvaliablesAndQuestionUps();
  });

  it('should be created with new values', () => {
    givenAServiceCreatedFromBaseService();
    thenHaveSameValuesThanBase();
  });

  it('vote up must return true and add new question voted', () => {
    givenAService();
    var result = whenVoteUp();
    thenReturnTrueAndAddNewQuestionVoted(result);
  });

  it("vote down on vote up (because it's already voted)", () => {
    givenAServiceWithAQuestionVoted();
    var result = whenVoteUp();
    thenReturnTrueAndHasNoQuestionUps(result);
  });

  it('vote down  return true and add remove the question of questionUp list', () => {
    givenAService();
    var result = whenVoteDown();
    thenReturnTrueAndHasNoQuestionUps(result);
  });

  it('vote down of unvoted question', () => {
    givenAService();
    var result = whenVoteDown();
    thenReturnTrueAndHasNoQuestionUps(result);
  });

  function givenAService() {
    service = new VotingSystem();
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  function thenHaveMaxVotesAvaliablesAndQuestionUps() {
    expect(service.maxVotesAvaliables).toBeGreaterThan(0);
    expect(service.questionsUp.length).toEqual(0);
  }

  function givenAServiceCreatedFromBaseService() {
    service = new VotingSystem(newVotingSystem);
  }

  function thenHaveSameValuesThanBase() {
    expect(service.maxVotesAvaliables).toEqual(
      newVotingSystem.maxVotesAvaliables,
    );
    expect(service.questionsUp.length).toEqual(
      newVotingSystem.questionsUp.length,
    );
  }

  function whenVoteUp() {
    return service.voteUp(questionOne);
  }

  function thenReturnTrueAndAddNewQuestionVoted(result: boolean) {
    expect(result).toBeTrue();
    expect(service.questionsUp.length).toEqual(1);
  }

  function givenAServiceWithAQuestionVoted() {
    service = new VotingSystem();
    service.voteUp(questionOne);
  }

  function thenReturnTrueAndHasNoQuestionUps(result: boolean) {
    expect(result).toBeTrue();
    expect(service.questionsUp.length).toEqual(0);
  }

  function whenVoteDown() {
    return service.voteDown(questionOne);
  }
});
