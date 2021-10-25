import { BreakoutRoom } from './breackout-room';

export class BreakoutRoomFirebase {
  id: string = 'default';
  name: string = 'default';
  rooms: BreakoutRoom[] = [
    {
      url: 'https://meet.google.com/pyu-hzsm-dwj',
      name: 'patio',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/mog-sshc-dps',
      name: 'cafetería',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/iev-ruwr-sbw',
      name: 'sala de reuniones',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/jrf-svbf-ham',
      name: 'piso de abajo',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/pcf-rwmu-ufk',
      name: 'cocina',
      participants: 0,
    },
    {
      url: 'https://meet.google.com/zuy-eogv-zxw',
      name: 'piso de arriba',
      participants: 0,
    },
  ];
}
