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
  // let questionTwo = {
  //   id: 'question-2',
  //   name: 'name',
  //   votes: 0,
  //   title: 'title2',
  //   description: 'description2',
  // };
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

  it('vote up', () => {
    const service = new VotingSystem();
    expect(service.voteUp(questionOne)).toBeTrue();
    expect(service.questionsUp.length).toEqual(1);
  });

  it('vote down', () => {
    const service = new VotingSystem();
    expect(service.voteDown(questionOne)).toBeTrue();
    expect(service.questionsUp.length).toEqual(0);
  });
});
