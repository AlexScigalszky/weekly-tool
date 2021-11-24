import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RetroData } from '../models/retro-data';
import { RetroItem } from '../models/retro-item';

@Injectable({
  providedIn: 'root',
})
export class RetroService {
  retroName = 'default';
  retroNameSubject = new BehaviorSubject(this.retroName);
  public retroName$ = this.retroNameSubject.asObservable();

  retrosCollectionName = `companies/${environment.companyName}/retros/`;
  retrosCollection: AngularFirestoreCollection<any> =
    this.firestore.collection<any>(this.retrosCollectionName);

  moreOfCollectionName = `companies/${environment.companyName}/retros/default/more-of`;
  moreOfCollection: AngularFirestoreCollection<RetroItem>;

  keepCollectionName = `companies/${environment.companyName}/retros/default/keep`;
  keepCollection: AngularFirestoreCollection<RetroItem>;

  lessOfCollectionName = `companies/${environment.companyName}/retros/default/lessOf`;
  lessOfCollection: AngularFirestoreCollection<RetroItem>;

  constructor(private firestore: AngularFirestore) {
    this.setRoom('default').then(() => {
      this.moreOfCollectionName = `companies/${environment.companyName}/retros/${this.retroName}/more-of`;
      this.moreOfCollection = this.firestore.collection<RetroItem>(
        this.moreOfCollectionName,
      );

      this.keepCollectionName = `companies/${environment.companyName}/retros/${this.retroName}/keep`;
      this.keepCollection = this.firestore.collection<RetroItem>(
        this.keepCollectionName,
      );

      this.lessOfCollectionName = `companies/${environment.companyName}/retros/${this.retroName}/lessOf`;
      this.lessOfCollection = this.firestore.collection<RetroItem>(
        this.lessOfCollectionName,
      );
    });
  }

  async existsRetro(retro: string): Promise<boolean> {
    var docRef = this.retrosCollection.doc(retro);

    var doc = await docRef.get().toPromise();
    return doc.exists;
  }

  async createRetro(room: string): Promise<RetroData> {
    const newRoom: RetroData = {
      ...new RetroData(),
      id: room,
    };
    return await this.retrosCollection
      .doc(`${newRoom.id}`)
      .set(newRoom)
      .then(() => newRoom);
  }

  async setRoom(room: string = this.retroName): Promise<void> {
    this.retroName = room;
    this.retroNameSubject.next(this.retroName);
    var exists = await this.existsRetro(this.retroName);
    if (!exists) {
      await this.createRetro(this.retroName);
      console.log(`retro ${this.retroName} created`);
    }
  }

  list(retro: string = this.retroName): Observable<RetroData> {
    const moreOf = this.firestore.collection<RetroItem>(
      `companies/${environment.companyName}/retros/${retro}/more-of`,
    );

    const keep = this.firestore.collection<RetroItem>(
      `companies/${environment.companyName}/retros/${retro}/keep`,
    );

    const lessOf = this.firestore.collection<RetroItem>(
      `companies/${environment.companyName}/retros/${retro}/lessOf`,
    );

    return combineLatest([
      moreOf.valueChanges(),
      keep.valueChanges(),
      lessOf.valueChanges(),
    ]).pipe(
      map(
        ([moreOf, keep, lessOf]) => ({
          id: retro,
          created: new Date().getTime(),
          moreOf,
          keep,
          lessOf,
        }),
        tap(console.log),
      ),
    );
  }

  retrosIds(): Observable<{ id: string }[]> {
    // const getId = x => x.payload.doc.id;
    return this.retrosCollection.valueChanges().pipe(
      tap(console.log),
      // map((documents) => documents.map(getId))
    );
  }

  addMoreOf(newitem: RetroItem): boolean {
    const id = this.firestore.createId();
    newitem = {
      ...newitem,
      id,
    };
    this.moreOfCollection.doc(id).set(newitem);
    return true;
  }

  addKeep(newitem: RetroItem): boolean {
    const id = this.firestore.createId();
    newitem = {
      ...newitem,
      id,
    };
    this.keepCollection.doc(id).set(newitem);
    return true;
  }

  addLessOf(newitem: RetroItem): boolean {
    const id = this.firestore.createId();
    newitem = {
      ...newitem,
      id,
    };
    this.lessOfCollection.doc(id).set(newitem);
    return true;
  }
}
