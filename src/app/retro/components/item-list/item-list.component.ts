import { Component, Input } from '@angular/core';
import { RetroItem } from '../../models/retro-item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input() list: RetroItem[] = [];

  date(item: RetroItem): Date {
    return new Date(item.whenWasHired ?? new Date().getTime());
  }
}
