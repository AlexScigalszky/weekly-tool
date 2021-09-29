import { Component } from '@angular/core';
import { SectionsAvaliablesService } from './services/sections-avaliables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public sections: SectionsAvaliablesService) {}
}
