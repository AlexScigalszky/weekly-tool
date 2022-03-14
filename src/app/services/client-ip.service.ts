import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientIpService {
  constructor(private http: HttpClient) {}

  getClientIp(): Observable<string> {
    return this.http.get<{ ip: string }>(environment.ipifyUrl).pipe(
      map((x) => x ?? null),
      map((x) => x?.ip),
    );
  }
}
