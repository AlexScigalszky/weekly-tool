import { BreakoutRoom } from '../models/breackout-room';
import { Balancer } from './balancer';

describe('VotingService', () => {
  let balancer: Balancer;
  let breakoutRoomList: BreakoutRoom[];
  let breakoutRoomWithOneParticipant: BreakoutRoom = {
    url: 'http:false.void',
    name: 'false',
    participants: 1,
  };

  it('should be created', () => {
    givenABalancer();
    thenExists();
  });

  it('should return a BreackoutRoom', () => {
    givenABalancerAndBreakoutRoomListWithOneItem();
    var result = whenCallToExtractRandomLink();
    thenReturnABreakoutRoom(result);
  });

  it('should return a BreackoutRoom', () => {
    givenABalancerAndBreakoutRoomListWithTwoItemsAndOneParticipant();
    var result = whenCallToExtractRandomLink();
    thenReturnTheBreakoutRoomWithOneParticipant(result);
  });

  function givenABalancer() {
    balancer = new Balancer();
  }

  function thenExists() {
    expect(balancer).toBeTruthy();
  }

  function givenABalancerAndBreakoutRoomListWithOneItem() {
    balancer = new Balancer();
    breakoutRoomList = [
      {
        url: 'http:false.void',
        name: 'false',
        participants: 0,
      },
    ];
  }

  function whenCallToExtractRandomLink() {
    return balancer.extractRandomLink(breakoutRoomList);
  }

  function thenReturnABreakoutRoom(result: BreakoutRoom) {
    expect(result).toBeTruthy();
  }

  function givenABalancerAndBreakoutRoomListWithTwoItemsAndOneParticipant() {
    balancer = new Balancer();
    breakoutRoomList = [
      breakoutRoomWithOneParticipant,
      {
        url: 'http:void.void',
        name: 'void',
        participants: 2,
      },
    ];
  }

  function thenReturnTheBreakoutRoomWithOneParticipant(result: BreakoutRoom) {
    expect(result).toBeTruthy();
    expect(result.participants).toBe(1);
    expect(result).toBe(breakoutRoomWithOneParticipant);
  }
});
