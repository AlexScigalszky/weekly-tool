import { BreakoutRoom } from './breackout-room';

export class BreakoutRoomFirebase {
  id: string = 'default';
  name: string = 'default';
  rooms: BreakoutRoom[] = [
    {
      url: 'https://meet.google.com/tmu-wewq-qzi',
      name: 'patio',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/boq-mejk-kzj',
      name: 'cafetería',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/gyt-srdq-ozw',
      name: 'sala de reuniones',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/coh-tncc-bzw',
      name: 'piso de abajo',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/fxz-ogtj-hsu',
      name: 'cocina',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/syo-urjh-nzw',
      name: 'piso de arriba',
      participants: 0,
    },
  ];
}
