import { Question } from './question';

export class VotingSystem {
  maxVotesAvaliables = 3;
  questionsUp: Question[] = [];

  constructor(data?: VotingSystem) {
    if (!data) {
      return;
    }
    if (data.questionsUp) {
      this.questionsUp = data.questionsUp;
    }
    if (data.maxVotesAvaliables) {
      this.maxVotesAvaliables = data.maxVotesAvaliables;
    }
  }

  voteUp(question: Question): boolean {
    const wasVoted = this.wasVoted(question);
    const canMakeNewVote = this.canMakeNewVote();
    if (!wasVoted && canMakeNewVote) {
      question.votes++;
      this.questionsUp = [question, ...this.questionsUp];
      console.log(`voted up`, question);
      return true;
    } else if (wasVoted) {
      return this.voteDown(question);
    }
    return false;
  }

  voteDown(question: Question): boolean {
    question.votes--;
    if (question.votes < 0) {
      question.votes = 0;
    }
    this.questionsUp = this.questionsUp.filter((x) => x.id !== question.id);
    console.log(`voted down`, question);
    return true;
  }

  private canMakeNewVote() {
    const result = this.maxVotesAvaliables > this.questionsUp.length;
    console.log('canMakeNewVote', result);
    return result;
  }

  private wasVoted(question: Question): boolean {
    const result =
      this.questionsUp.find((x) => x.id === question.id) !== undefined;
    console.log('wasVoted', result);
    return result;
  }
}
