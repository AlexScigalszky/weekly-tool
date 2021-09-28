import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Partner } from '../models/partner';

@Injectable({
  providedIn: 'root',
})
export class PartnersMockService {
  list(): Observable<Partner[]> {
    const partner = new Partner('Alguien', new Date());
    return of([partner]);
  }
}
