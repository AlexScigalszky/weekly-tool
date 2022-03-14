import {
  ComponentFixture,
  fakeAsync,
  flush,
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
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { RetroService } from 'src/app/retro/services/retro.service';
import { AniversariesService } from 'src/app/services/aniversaries.service';
import { ClientIpService } from 'src/app/services/client-ip.service';
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
import {
  containText,
  findEl,
  findEls,
  hasText,
  isEmpty,
  wait,
} from 'src/test.helpers';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPinnedTopicsService = {
    list: () => of([]),
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
        { provide: ClientIpService, useClass: ClientIpService },
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

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    givenAComponent();
    thenExists();
  }));

  it('should create and show waiting', fakeAsync(() => {
    givenAComponent();
    thenHasWaiting();
    thenShowSimpsonQuote();
    thenFinishWaiting();
  }));

  it('should show topics section', fakeAsync(() => {
    givenAComponent();
    thenHasTopicsSection();
    thenHasTopicsSectionTitle();
  }));

  it('should show votes counter', fakeAsync(() => {
    givenAComponent();
    thenHasVotesCounter();
  }));

  it('should show users who votes counter', fakeAsync(() => {
    givenAComponent();
    thenHasUsersWhoVotesCounter();
  }));

  it('should show aniversary section', fakeAsync(() => {
    givenAComponentAfter8Seconds();
    thenHasAniversarySection();
  }));

  it('has new topic button', fakeAsync(() => {
    givenAComponent();
    thenHasNewTopicButton();
  }));

  it('should open dialog to add new topic', fakeAsync(() => {
    givenAComponent();
    whenNewTopicButtonClickThenOpenIsCalled();
  }));

  it('should vote a question', fakeAsync(() => {
    givenAComponentAfter8Seconds();
    thenOneVoteButton();
    whenVoteButtonClickThenVoteIsCalled();
  }));

  it('should unvote a question', fakeAsync(() => {
    givenAComponentAfter8Seconds();
    whenVoteButtonClickThenHave0votes();
  }));

  it('should reset all votes', fakeAsync(() => {
    givenAComponentAfter8Seconds();
    thenHaveResetButton();
    whenResetButtonClickThenResetVotesIsCalled();
  }));

  it('should open edit question dialog', fakeAsync(() => {
    givenAComponentAfter8Seconds();
    thenHaveOneMoreButton();
    whenEditButtonClickThenEditQuestionIsCalled();
  }));

  it('should not show pinned topics', fakeAsync(() => {
    givenAComponent();
    thenHaveNoPinnedTopicSection();
  }));

  async function givenAComponent() {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    wait(fixture);
  }

  function thenExists() {
    fixture.detectChanges();
    wait(fixture);
    expect(component).toBeTruthy();
  }

  function thenHasWaiting() {
    const waitingComponent = findEl(fixture, '#spinner');
    expect(waitingComponent).toBeTruthy();
  }

  function thenShowSimpsonQuote() {
    const waitingComponent = findEl(fixture, '.simpson-quote');
    expect(isEmpty(waitingComponent)).toBeFalsy();
  }

  function thenHasTopicsSection() {
    fixture.detectChanges();
    wait(fixture);
    wait(fixture);
    const topicSection = findEl(fixture, '#topics-section');
    expect(topicSection).toBeTruthy();
  }

  function thenHasTopicsSectionTitle() {
    tick(1000);
    containText(fixture, '#topics-section', 'Temas a conversar');
  }

  function thenHasVotesCounter() {
    wait(fixture);
    fixture.detectChanges();

    tick(800);
    hasText(fixture, '#votes-counter', '0');
  }

  function thenHasUsersWhoVotesCounter() {
    wait(fixture);
    fixture.detectChanges();

    tick(800);
    hasText(fixture, '#users-votes-counter', '0');
  }

  function thenHasAniversarySection() {
    const topicSection = findEl(fixture, '.aniversary-section');
    expect(topicSection).toBeTruthy();
  }

  function thenHasNewTopicButton() {
    wait(fixture);
    const newTopicButton = findEl(fixture, '#new-topic-button');
    expect(newTopicButton).toBeTruthy();
    fixture.detectChanges();
    fixture.destroy();
  }

  function whenNewTopicButtonClickThenOpenIsCalled() {
    wait(fixture);
    fixture.detectChanges();
    const button = findEl(fixture, '#new-topic-button');
    const openDialogSpy = spyOn(component.dialog, 'open');
    button.triggerEventHandler('click', null);
    expect(openDialogSpy).toHaveBeenCalled();
    fixture.detectChanges();
    fixture.destroy();
    flush();
  }

  function givenAComponentAfter8Seconds() {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    wait(fixture);
    tick(800);
    fixture.detectChanges();
  }

  function thenOneVoteButton() {
    const buttons = findEls(fixture, '.vote-button');
    expect(buttons.length).toBeGreaterThan(0);
    const voteButton = buttons[0];
    expect(voteButton).toBeTruthy();
  }

  function whenVoteButtonClickThenVoteIsCalled() {
    const voteSpy = spyOn(component, 'vote');
    const buttons = findEls(fixture, '.vote-button');
    const voteButton = buttons[0];
    voteButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    wait(fixture);
    tick(800);
    expect(voteSpy).toHaveBeenCalled();
  }

  function whenVoteButtonClickThenHave0votes() {
    const buttons = findEls(fixture, '.vote-button');
    const voteButton = buttons[0];
    voteButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    wait(fixture);
    tick(800);
    containText(fixture, '#topics-section', '0  votos');
  }

  function thenHaveResetButton() {
    const resetVotes = findEl(fixture, '#reset-votes');
    expect(resetVotes).toBeTruthy();
  }

  function whenResetButtonClickThenResetVotesIsCalled() {
    const resetVotes = findEl(fixture, '#reset-votes');
    const resetVotesSpy = spyOn(component, 'resetVotes');
    resetVotes.triggerEventHandler('click', null);
    expect(resetVotesSpy).toHaveBeenCalled();
  }

  function thenHaveOneMoreButton() {
    const moreButtons = findEls(fixture, '.more-button');
    const moreButton = moreButtons[0];
    expect(moreButton).toBeTruthy();
  }

  function whenEditButtonClickThenEditQuestionIsCalled() {
    const moreButtons = findEls(fixture, '.more-button');
    const moreButton = moreButtons[0];
    moreButton.triggerEventHandler('click', null);

    const editButton = moreButton.query(By.css('.edit-button'));

    expect(editButton).toBeTruthy();

    const editQuestionSpy = spyOn(component, 'editQuestion');
    editButton.triggerEventHandler('click', null);

    expect(editQuestionSpy).toHaveBeenCalled();
    wait(fixture);
    tick(800);
  }

  function thenHaveNoPinnedTopicSection() {
    const pinnedTopics = findEls(fixture, '.pinned-topic-section');
    expect(pinnedTopics.length).toBe(0);
    fixture.detectChanges();
    fixture.destroy();
    flush();
  }

  function thenFinishWaiting() {
    wait(fixture);
    tick(800);
  }
});
