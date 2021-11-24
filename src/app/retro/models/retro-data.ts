import { RetroItem } from './retro-item';

export class RetroData {
  id: string = 'default';
  created: number = new Date().getTime();
  moreOf: RetroItem[] = [];
  keep: RetroItem[] = [];
  lessOf: RetroItem[] = [];
}
