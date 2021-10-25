import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { BreakoutRoom } from 'src/app/models/breackout-room';
import { BreakoutRoomFirebase } from 'src/app/models/breackout-room-firebase';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  model = null;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private breakoutRooms: BreakoutRoomsFirebaseService,
  ) {
    const subs = this.breakoutRooms.currentFirebaseRooms$
      .pipe(
        filter((x) => !!x),
        take(1),
      )
      .subscribe((data: BreakoutRoomFirebase) => {
        this.model = {
          patio: this.getRoomWithNameSafely(data.rooms, Constants.PATIO),
          cafeteria: this.getRoomWithNameSafely(
            data.rooms,
            Constants.CAFETERIA,
          ),
          salaDeReuniones: this.getRoomWithNameSafely(
            data.rooms,
            Constants.SALA_DE_REUNIONES,
          ),
          pisoDeAbajo: this.getRoomWithNameSafely(
            data.rooms,
            Constants.PISO_DE_ABAJO,
          ),
          cocina: this.getRoomWithNameSafely(data.rooms, Constants.COCINA),
          pisoDeArriba: this.getRoomWithNameSafely(
            data.rooms,
            Constants.PISO_DE_ARRIBA,
          ),
        };
      });
    this.subscriptions.push(subs);
  }

  async ngOnInit(): Promise<void> {
    const room = this.route.snapshot.params.room ?? 'default';
    await this.breakoutRooms.setCurrentRoom(room);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  getRoomWithNameSafely(rooms: BreakoutRoom[], roomName: string): string {
    return rooms.find((x) => x.name === roomName)?.url ?? '';
  }

  save(): Promise<void> {
    return this.breakoutRooms.update(
      this.model.patio,
      this.model.cafeteria,
      this.model.salaDeReuniones,
      this.model.pisoDeAbajo,
      this.model.cocina,
      this.model.pisoDeArriba,
    );
  }
}
