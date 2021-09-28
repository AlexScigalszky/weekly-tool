import { TestBed } from '@angular/core/testing';

import { VotingSystem } from './voting-system';

describe('VotingSystem', () => {
  const newVotingSystem = new VotingSystem();
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

  it('should be created with default values', () => {
    const service = new VotingSystem();
    expect(service).toBeTruthy();
    expect(service.maxVotesAvaliables).toBeGreaterThan(0);
    expect(service.questionsUp.length).toEqual(0);
  });

  it('should be created with new values', () => {
    const service = new VotingSystem(newVotingSystem);
    expect(service).toBeTruthy();
    expect(service.maxVotesAvaliables).toEqual(
      newVotingSystem.maxVotesAvaliables,
    );
    expect(service.questionsUp.length).toEqual(
      newVotingSystem.questionsUp.length,
    );
  });

  it('vote up must return true and add new question voted', () => {
    const service = new VotingSystem();
    expect(service.voteUp(questionOne)).toBeTrue();
    expect(service.questionsUp.length).toEqual(1);
  });

  it("vote down on vote up (because it's already voted)", () => {
    const service = new VotingSystem();
    service.voteUp(questionOne);
    expect(service.questionsUp.length).toEqual(1);

    expect(service.voteUp(questionOne)).toBeTrue();
    expect(service.questionsUp.length).toEqual(0);
  });

  it('vote down  return true and add remove the question of questionUp list', () => {
    const service = new VotingSystem();
    expect(service.voteDown(questionOne)).toBeTrue();
    expect(service.questionsUp.length).toEqual(0);
  });

  it('vote down of unvoted question', () => {
    const service = new VotingSystem();

    expect(service.voteDown(questionOne)).toBeTrue();

    expect(service.questionsUp.length).toEqual(0);
  });
});
