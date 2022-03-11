import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PinnedItem } from '../models/pinned-item';

@Injectable({
  providedIn: 'root',
})
export class PinnedTopicsService {
  pinnedTopicCollectionName = `companies/${environment.companyName}/pinned-topics/default/list`;
  pinnedTopicCollection: AngularFirestoreCollection<PinnedItem>;

  constructor(private firestore: AngularFirestore) {
    this.pinnedTopicCollection = this.firestore.collection<PinnedItem>(
      this.pinnedTopicCollectionName,
    );
  }

  setRoom(roomName: string) {
    this.pinnedTopicCollectionName = `companies/${environment.companyName}/pinned-topics/${roomName}/list`;
    this.pinnedTopicCollection = this.firestore.collection<PinnedItem>(
      this.pinnedTopicCollectionName,
    );
  }

  list(): Observable<PinnedItem[]> {
    return this.pinnedTopicCollection.valueChanges();
  }

  add(pinnedItem: PinnedItem): void {
    const id = this.firestore.createId();
    pinnedItem = {
      text: pinnedItem.text,
      id,
    };
    this.pinnedTopicCollection.doc(id).set(pinnedItem);
  }

  update(pinnedItem: PinnedItem): Promise<void> {
    return this.pinnedTopicCollection
      .doc(pinnedItem.id)
      .set(pinnedItem, { merge: true });
  }
}
