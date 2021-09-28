import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SectionsAvaliablesService {
  public aniversary: boolean = true;
  public quiestionLists: boolean = true;
  public currentQuestion: boolean = false;
}
