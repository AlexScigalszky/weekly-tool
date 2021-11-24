import { Component, Input } from '@angular/core';
import { PinnedItem } from 'src/app/models/pinned-item';

@Component({
  selector: 'app-pinned-topics',
  templateUrl: './pinned-topics.component.html',
  styleUrls: ['./pinned-topics.component.scss'],
})
export class PinnedTopicsComponent {
  @Input()
  topics: PinnedItem[] = [];
}
