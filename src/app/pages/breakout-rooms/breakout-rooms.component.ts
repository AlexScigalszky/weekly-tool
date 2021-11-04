import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BreakoutRoom } from 'src/app/models/breackout-room';
import { RetroService } from 'src/app/retro/services/retro.service';
import { BreakoutRoomsFirebaseService } from 'src/app/services/breakout-rooms-firebase.service';

@Component({
  selector: 'app-breakout-rooms',
  templateUrl: './breakout-rooms.component.html',
  styleUrls: ['./breakout-rooms.component.scss'],
})
export class BreakoutRoomsComponent implements OnInit {
  urlRoom$: Observable<BreakoutRoom>;
  countRooms$: Observable<number>;
  message = 'Creando salas';

  constructor(
    private route: ActivatedRoute,
    private retroService: RetroService,
    private breakoutRooms: BreakoutRoomsFirebaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    const room = this.route.snapshot.params.room ?? 'default';
    await this.breakoutRooms.setCurrentRoom(room);
    this.retroService.setRoom(room);
    this.countRooms$ = this.breakoutRooms.getCountRooms();
    setTimeout(() => (this.message = 'Seleccionando sala al azar'), 500);
  }

  enterToRandomRoom(): void {
    console.log('entrando a sala al azar');

    this.breakoutRooms
      .getRandomLink()
      .pipe(take(1))
      .subscribe((room) => {
        console.log('actualizando cantidad de participantes');
        this.message = `Entrando a ${room.name}`;
        this.breakoutRooms.plusOneParticipant(room).then(() => {
          console.log('participant updated', room);
          Object.assign(document.createElement('a'), {
            target: '_blank',
            href: room.url,
          }).click();
        });
      });
  }
}
