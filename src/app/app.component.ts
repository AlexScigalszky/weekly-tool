import { Component } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { RetroService } from './retro/services/retro.service';
import { SectionsAvaliablesService } from './services/sections-avaliables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  room$ = this.retro.retroName$.pipe(startWith('default'));

  constructor(
    public sections: SectionsAvaliablesService,
    private retro: RetroService,
  ) {}
}
