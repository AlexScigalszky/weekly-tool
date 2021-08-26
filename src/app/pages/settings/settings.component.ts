import { Component, OnInit } from '@angular/core';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  patio: string = '';
  cafeteria: string = '';
  salaDeReuniones: string = '';
  pisoDeAbajo: string = '';
  cocina: string = '';
  pisoDeArriba: string = '';

  constructor(private breakoutRooms: BreakoutRoomsFirebaseService) {}

  ngOnInit(): void {}

  save(): void {
    this.breakoutRooms.update(
      this.patio,
      this.cafeteria,
      this.salaDeReuniones,
      this.pisoDeAbajo,
      this.cocina,
      this.pisoDeArriba,
    );
  }
}
