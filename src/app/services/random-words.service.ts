import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, WordOfTheDay } from '../models/word-of-the-day';

@Injectable({
  providedIn: 'root',
})
export class RandomWordsService {
  constructor(private http: HttpClient) {}

  getWordOfTheDay(): Observable<APIResponse<WordOfTheDay>> {
    return this.http.get<APIResponse<WordOfTheDay>>(
      environment.baseRandomWordsApiUrl + '/word-of-the-day',
    );
  }
}
