import { Component, Input } from '@angular/core';
import { Partner } from 'src/app/models/partner';
import { AniversariesService } from 'src/app/services/aniversaries.service';

@Component({
  selector: 'wt-aniversaries',
  templateUrl: './aniversaries.component.html',
  styleUrls: ['./aniversaries.component.scss'],
})
export class AniversariesComponent {
  @Input()
  aniversaries: Partner[] = [];

  constructor(private aniversariesService: AniversariesService) {}

  years(partner: Partner): string {
    const y = this.aniversariesService.calculateDiffInYears(
      new Date(partner.whenWasHired),
      new Date(),
    );
    return isNaN(y) ? '0 años' : y === 1 ? '1 año' : y + ' años';
  }
}
