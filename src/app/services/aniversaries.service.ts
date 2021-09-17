import { Injectable } from '@angular/core';
import { Partner } from '../models/partner';

@Injectable({
  providedIn: 'root',
})
export class AniversariesService {
  getWhoHaveAnAniversary(partners: Partner[]): Partner[] {
    return partners.filter((x) => this.hasAniversaryInThisWeek(x.whenWasHired));
  }

  hasAniversaryInThisWeek(date: Date): boolean {
    const today = new Date();
    const diffDays = this.calculateDiffInDays(date, today);
    const debt = diffDays % 365;
    const years = diffDays / 365;
    return 0 <= debt && debt <= 7 && years > 0;
  }

  calculateDiffInDays(first: Date, second: Date) {
    return Math.floor(
      (Date.UTC(second.getFullYear(), second.getMonth(), second.getDate()) -
        Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) /
        (1000 * 60 * 60 * 24),
    );
  }
}
