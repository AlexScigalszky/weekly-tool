import { Component, Input } from '@angular/core';
import { PinnedItem } from 'src/app/models/pinned-item';

@Component({
  selector: 'wt-pinned-topics',
  templateUrl: './pinned-topics.component.html',
  styleUrls: ['./pinned-topics.component.scss'],
})
export class PinnedTopicsComponent {
  @Input() topics: PinnedItem[] = [];

  get topicsFiltered(): PinnedItem[] {
    return this.topics.filter((topic) => topic.text);
  }
}
