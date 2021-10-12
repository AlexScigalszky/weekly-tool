import { RetroItem } from './retro-item';

export class RetroData {
  id: string = 'default';
  moreOf: RetroItem[] = [];
  keep: RetroItem[] = [];
  lessOf: RetroItem[] = [];
}
