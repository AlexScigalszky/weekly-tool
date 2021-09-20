import { Injectable } from '@angular/core';
import { Partner } from '../models/partner';

@Injectable({
  providedIn: 'root',
})
export class AniversariesService {
  getWhoHaveAnAniversary(partners: Partner[]): Partner[] {
    console.log(
      'partners',
      partners.map((x) => new Date(x.whenWasHired)),
    );
    return partners.filter((x) =>
      this.hasAniversaryInThisWeek(new Date(x.whenWasHired)),
    );
  }

  hasAniversaryInThisWeek(date: Date): boolean {
    const today = new Date();
    const diffDays = this.calculateDiffInDays(date, today);
    console.log({ date, today });
    const debt = diffDays % 365;
    const years = diffDays / 365;
    const has = 0 <= debt && debt <= 7 && years > 0;
    console.log('hasAniversaryInThisWeek', { debt, years, has });
    return has;
  }

  calculateDiffInDays(first: Date, second: Date) {
    return Math.floor(
      (Date.UTC(second.getFullYear(), second.getMonth(), second.getDate()) -
        Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) /
        (1000 * 60 * 60 * 24),
    );
  }

  calculateDiffInYears(first: Date, second: Date) {
    return Math.floor(
      (Date.UTC(second.getFullYear(), second.getMonth(), second.getDate()) -
        Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) /
        31536000000,
    );
  }
}
