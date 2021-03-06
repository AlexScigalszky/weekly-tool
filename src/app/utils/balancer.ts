import { BreakoutRoom } from '../models/breackout-room';

export class Balancer {
  maxPeopleInSameRoom: number;

  extractRandomLink(rooms: BreakoutRoom[]): BreakoutRoom {
    rooms = this.sortRoomsByParticipants(rooms);
    var urlRoom: BreakoutRoom;
    var index = -1;
    do {
      index++;
      urlRoom = rooms[index];
      if (index >= rooms.length) {
        break;
      }
    } while (
      urlRoom === undefined ||
      this.maxPeopleInSameRoom < urlRoom.participants
    );
    if (urlRoom === undefined) {
      index = -1;
      do {
        index++;
        urlRoom = rooms[index];
      } while (urlRoom === undefined);
    }

    return urlRoom;
  }

  sortRoomsByParticipants(rooms: BreakoutRoom[]): BreakoutRoom[] {
    return rooms.sort((a, b) => {
      // if (a.participants === 1) {
      //   return -1;
      // } else if (b.participants === 1) {
      //   return 1;
      // } else {
      //   return a.participants - b.participants;
      // }
      return a.participants - b.participants;
    });
  }
}
