import { Observable, of } from 'rxjs';
import { BreakoutRoom } from 'src/app/models/breackout-room';

export class BreakoutRoomsServiceMock {
  currentFirebaseRooms$: Observable<any>;

  constructor() {
    this.currentFirebaseRooms$ = of({
      name: 'defaut',
      rooms: [
        {
          name: 'patio',
          url: '',
        },
        {
          name: 'cafeteria',
          url: '',
        },
        {
          name: 'salaDeReuniones',
          url: '',
        },
        {
          name: 'pisoDeAbajo',
          url: '',
        },
        {
          name: 'cocina',
          url: '',
        },
        {
          name: 'pisoDeArriba',
          url: '',
        },
      ],
    });
  }
  
  update(
    patio: string,
    cafeteria: string,
    salaDeReuniones: string,
    pisoDeAbajo: string,
    cocina: string,
    pisoDeArriba: string,
  ): Promise<void> {
    console.log('promise ejeutated');
    return new Promise<void>((resolve) => resolve());
  }

  getRandomLink(): Observable<BreakoutRoom> {
    return of(new BreakoutRoom());
  }

  getCountRooms() {
    return of(2);
  }
}
