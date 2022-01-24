import { BreakoutRoom } from './breackout-room';

export class BreakoutRoomFirebase {
  id: string = 'default';
  name: string = 'default';
  rooms: BreakoutRoom[] = [
    {
      url: 'https://meet.google.com/ycf-puyt-kab',
      name: 'patio',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/xeo-porh-hrw',
      name: 'cafetería',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/gui-qgfy-tfa',
      name: 'sala de reuniones',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/eff-qoih-cvj',
      name: 'piso de abajo',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/nvx-ikix-mdv',
      name: 'cocina',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/cnj-nupf-cpa',
      name: 'piso de arriba',
      participants: 0,
    },
  ];
}
