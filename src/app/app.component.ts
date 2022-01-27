import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { first, startWith, tap } from 'rxjs/operators';
import { PinnedTopicModalComponent } from './components/pinned-topic-modal/pinned-topic-modal.component';
import { PinnedItem } from './models/pinned-item';
import { RetroService } from './retro/services/retro.service';
import { PinnedTopicsService } from './services/pinned-topics.service';
import { SectionsAvaliablesService } from './services/sections-avaliables.service';
import { environment } from 'src/environments/environment';
import { RandomWordsService } from './services/random-words.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  room$ = this.retro.retroName$.pipe(
    startWith('default'),
    tap((x) => this.pinnedService.setRoom(x)),
  );
  subscriptions: Subscription[] = [];
  companyName: string = environment.companyName;
  wordOfTheDay$ = this.randomWordsService.getWordOfTheDay();
  wordDefinitionURL = environment.palabrasAleatoriasURL + '/#/specific-word/';
  

  constructor(
    public sections: SectionsAvaliablesService,
    private pinnedService: PinnedTopicsService,
    private retro: RetroService,
    private randomWordsService: RandomWordsService,
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
          if (!pinnedTopicStr) {
            return;
          }
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
