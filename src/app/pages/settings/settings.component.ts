import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { BreakoutRoomFirebase } from 'src/app/models/breackout-room-firebase';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  model = null;
  // {
  //   patio: 'patio',
  //   cafeteria: 'cafeteria',
  //   salaDeReuniones: 'salaDeReuniones',
  //   pisoDeAbajo: 'pisoDeAbajo',
  //   cocina: 'cocina',
  //   pisoDeArriba: 'pisoDeArriba',
  // };

  constructor(private breakoutRooms: BreakoutRoomsFirebaseService) {
    this.breakoutRooms.currentFirebaseRooms$
      .pipe(
        filter((x) => !!x),
        take(1),
      )
      .subscribe((data: BreakoutRoomFirebase) => {
        this.model = {
          patio: data.rooms.find((x) => x.name === 'patio')?.url,
          cafeteria: data.rooms.find((x) => x.name === 'cafeteria')?.url,
          salaDeReuniones: data.rooms.find((x) => x.name === 'salaDeReuniones')
            ?.url,
          pisoDeAbajo: data.rooms.find((x) => x.name === 'pisoDeAbajo')?.url,
          cocina: data.rooms.find((x) => x.name === 'cocina')?.url,
          pisoDeArriba: data.rooms.find((x) => x.name === 'pisoDeArriba')?.url,
        };
      });
  }

  ngOnInit(): void {}

  save(): Promise<void> {
    return this.breakoutRooms
      .update(
        this.model.patio,
        this.model.cafeteria,
        this.model.salaDeReuniones,
        this.model.pisoDeAbajo,
        this.model.cocina,
        this.model.pisoDeArriba,
      )
  }
}
