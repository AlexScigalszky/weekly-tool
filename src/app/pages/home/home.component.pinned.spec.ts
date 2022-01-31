import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { PinnedItem } from 'src/app/models/pinned-item';
import { RetroService } from 'src/app/retro/services/retro.service';
import { AniversariesService } from 'src/app/services/aniversaries.service';
import { PartnersMockService } from 'src/app/services/partners-mock.service';
import { PartnersService } from 'src/app/services/partners.service';
import { PinnedTopicsService } from 'src/app/services/pinned-topics.service';
import { QuestionMockService } from 'src/app/services/question.mock.service';
import { QuestionService } from 'src/app/services/question.service';
import { SectionsAvaliablesService } from 'src/app/services/sections-avaliables.service';
import { SimpsonService } from 'src/app/services/simpson.service';
import { TimerMockService } from 'src/app/services/timer-mock.service';
import { TimerService } from 'src/app/services/timer.service';
import { VotingService } from 'src/app/services/voting.service';
import { environment } from 'src/environments/environment';
import { findEls, wait } from 'src/test.helpers';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let mockPinnedTopicsService = {
    list: () => {
      console.log('mockPinnedTopicsService.list()');
      return of([new PinnedItem()]);
    },
    setRoom: (_string) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterModule.forRoot([]),
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        MatOptionModule,
        AppModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        { provide: MatDialog, useValue: { close: () => {}, open: () => {} } },
        { provide: MatDialogRef, useValue: {} },
        { provide: QuestionService, useClass: QuestionMockService },
        { provide: TimerService, useClass: TimerMockService },
        { provide: VotingService, useClass: VotingService },
        { provide: PartnersService, useClass: PartnersMockService },
        { provide: AniversariesService, useClass: AniversariesService },
        { provide: SimpsonService, useClass: SimpsonService },
        {
          provide: SectionsAvaliablesService,
          useClass: SectionsAvaliablesService,
        },
        {
          provide: PinnedTopicsService,
          useValue: mockPinnedTopicsService,
        },
        {
          provide: RetroService,
          useValue: {
            setRoom: (_: string) => {
              return new Promise((r) => r(false));
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should show pinned topics', fakeAsync(() => {
    givenAComponentWithPinnedTopics();
    thenHavePinnedTopicSection();
  }));

  async function givenAComponentWithPinnedTopics() {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    wait(fixture);
    tick(800);
  }

  function thenHavePinnedTopicSection() {
    const pinnedTopics = findEls(fixture, '.pinned-topic-section');
    expect(pinnedTopics.length).toBe(1);
  }
});
