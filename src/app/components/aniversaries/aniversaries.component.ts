import { Component, Input } from '@angular/core';
import { Partner } from 'src/app/models/partner';

@Component({
  selector: 'app-aniversaries',
  templateUrl: './aniversaries.component.html',
  styleUrls: ['./aniversaries.component.scss']
})
export class AniversariesComponent {
  @Input()
  aniversaries: Partner[] = [];

}
