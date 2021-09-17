import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Partner } from '../models/partner';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  partnerCollectionName = 'partners';
  partnerCollection: AngularFirestoreCollection<Partner>;

  constructor(private firestore: AngularFirestore) {
    this.partnerCollection = this.firestore.collection<Partner>(
      this.partnerCollectionName,
    );
  }

  list(): Observable<Partner[]> {
    return this.partnerCollection.valueChanges();
  }
}
