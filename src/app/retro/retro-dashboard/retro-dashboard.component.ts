import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RetroData } from '../models/retro-data';
import { RetroService } from '../services/retro.service';

@Component({
  selector: 'app-retro-dashboard',
  templateUrl: './retro-dashboard.component.html',
  styleUrls: ['./retro-dashboard.component.scss'],
})
export class RetroDashboardComponent implements OnInit {
  sections$: Observable<RetroData>;
  beforeRetros$: Observable<{ id: string }> = this.retroService
    .retrosIds()
    .pipe(
      tap(console.log),
      map((x) => x.filter((r) => r.id !== this.room)),
    );
  sectionsBeforeRetro$: Observable<RetroData>;
  beforeRetroSelected = '';
  room = 'defaul23t';

  constructor(
    private retroService: RetroService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.room = this.route.snapshot.params.room ?? 'default';
    this.retroService.setRoom(this.room).then(() => {
      this.sections$ = this.retroService.list();
    });
  }

  sendMoreOf(text: string) {
    const item = {
      id: null,
      text: text,
    };
    this.retroService.addMoreOf(item);
  }

  sendKeep(text: string) {
    const item = {
      id: null,
      text: text,
    };
    this.retroService.addKeep(item);
  }

  sendLessOf(text: string) {
    const item = {
      id: null,
      text: text,
    };
    this.retroService.addLessOf(item);
  }

  selectRetro() {
    console.log(this.beforeRetroSelected);
    if (this.beforeRetroSelected === 'empty') {
      this.sectionsBeforeRetro$ = of(null);
    } else {
      this.sectionsBeforeRetro$ = this.retroService.list(
        this.beforeRetroSelected,
      );
    }
  }
}
