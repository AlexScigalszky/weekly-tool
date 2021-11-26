import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { first, startWith } from 'rxjs/operators';
import { PinnedTopicModalComponent } from './components/pinned-topic-modal/pinned-topic-modal.component';
import { PinnedItem } from './models/pinned-item';
import { RetroService } from './retro/services/retro.service';
import { PinnedTopicsService } from './services/pinned-topics.service';
import { SectionsAvaliablesService } from './services/sections-avaliables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  room$ = this.retro.retroName$.pipe(startWith('default'));
  subscriptions: Subscription[] = [];

  constructor(
    public sections: SectionsAvaliablesService,
    private pinnedService: PinnedTopicsService,
    private retro: RetroService,
    private dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  addPinnedTopic() {
    const subs = this.pinnedService
      .list()
      .pipe(
        // map((x) => (x.length == 0 ? null : x)),
        first(),
      )
      .subscribe((x) => {
        const alreadyExists: boolean = x.length > 0;
        const dialogRef = this.dialog.open(PinnedTopicModalComponent, {
          width: '50vw',
          data: x ?? '',
        });

        dialogRef.afterClosed().subscribe((pinnedTopicStr) => {
          if (alreadyExists) {
            this.pinnedService.update({
              id: x[0].id,
              text: pinnedTopicStr,
            });
            console.log(`pinned topic ${pinnedTopicStr} updated`);
          } else {
            this.pinnedService.add({
              ...new PinnedItem(),
              text: pinnedTopicStr,
            });
            console.log(`pinned topic ${pinnedTopicStr} added`);
          }
        });
      });
    this.subscriptions.push(subs);
  }
}
