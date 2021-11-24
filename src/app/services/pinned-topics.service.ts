import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PinnedItem } from '../models/pinned-item';

@Injectable({
  providedIn: 'root',
})
export class PinnedTopicsService {
  pinnedTopicCollectionName = `companies/${environment.companyName}/pinned-topics`;
  pinnedTopicCollection: AngularFirestoreCollection<PinnedItem>;

  constructor(private firestore: AngularFirestore) {
    this.pinnedTopicCollection = this.firestore.collection<PinnedItem>(
      this.pinnedTopicCollectionName,
    );
  }

  list(): Observable<PinnedItem[]> {
    return this.pinnedTopicCollection
      .valueChanges()
      .pipe(tap((x) => console.log(`pinned-topics`, x)));
  }
}
