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
import { AppModule } from 'src/app/app.module';
import { AniversariesService } from 'src/app/services/aniversaries.service';
import { PartnersMockService } from 'src/app/services/partners-mock.service';
import { PartnersService } from 'src/app/services/partners.service';
import { QuestionMockService } from 'src/app/services/question.mock.service';
import { QuestionService } from 'src/app/services/question.service';
import { TimerMockService } from 'src/app/services/timer-mock.service';
import { TimerService } from 'src/app/services/timer.service';
import { VotingService } from 'src/app/services/voting.service';
import { environment } from 'src/environments/environment';
import { containText, findEl, findEls, hasText, wait } from 'src/test.helpers';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show waiting', fakeAsync(() => {
    expect(component).toBeTruthy();
    const waitingComponent = findEl(fixture, '#spinner');
    expect(waitingComponent).toBeTruthy();
  }));

  it('should show topics section', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    wait(fixture);
    const topicSection = findEl(fixture, '#topics-section');

    expect(topicSection).toBeTruthy();

    tick(800);
    containText(fixture, '#topics-section', 'Temas a conversar');
  }));

  it('should show votes counter', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    wait(fixture);
    fixture.detectChanges();

    tick(800);
    hasText(fixture, '#votes-counter', '0');
  }));

  it('should show aniversary section', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    wait(fixture);
    tick(800);
    const topicSection = findEl(fixture, '.aniversary-section');

    expect(topicSection).toBeTruthy();
  }));

  it('hs new topic button', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    wait(fixture);
    const newTopicButton = findEl(fixture, '#new-topic-button');
    expect(newTopicButton).toBeTruthy();
    fixture.detectChanges();
    fixture.destroy();
  }));

  it('should open dialog to add new topic', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    wait(fixture);
    fixture.detectChanges();
    const button = findEl(fixture, '#new-topic-button');

    const openDialogSpy = spyOn(component.dialog, 'open');
    button.triggerEventHandler('click', null);

    expect(openDialogSpy).toHaveBeenCalled();
    fixture.detectChanges();
    fixture.destroy();
    flush();
  }));

  it('should vote a question', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    wait(fixture);
    tick(800);
    fixture.detectChanges();
    const buttons = findEls(fixture, '.vote-button');
    expect(buttons.length).toBeGreaterThan(0);
    const voteButton = buttons[0];
    expect(voteButton).toBeTruthy();

    const voteSpy = spyOn(component, 'vote');

    voteButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    wait(fixture);
    tick(800);

    expect(voteSpy).toHaveBeenCalled();
  }));

  it('should unvote a question', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    wait(fixture);
    tick(800);
    fixture.detectChanges();
    const buttons = findEls(fixture, '.vote-button');
    expect(buttons.length).toBeGreaterThan(0);
    const voteButton = buttons[0];
    expect(voteButton).toBeTruthy();
    voteButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    wait(fixture);
    tick(800);
    containText(fixture, '#topics-section', '0  votos');
  }));

  it('should reset all votes', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    wait(fixture);
    tick(800);
    fixture.detectChanges();
    const resetVotes = findEl(fixture, '#reset-votes');
    expect(resetVotes).toBeTruthy();

    const resetVotesSpy = spyOn(component, 'resetVotes');

    resetVotes.triggerEventHandler('click', null);

    expect(resetVotesSpy).toHaveBeenCalled();
  }));

  it('should open edit question dialog', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    wait(fixture);
    tick(800);
    fixture.detectChanges();

    const moreButtons = findEls(fixture, '.more-button');
    const moreButton = moreButtons[0];
    expect(moreButton).toBeTruthy();
    moreButton.triggerEventHandler('click', null);

    const editButton = moreButton.query(By.css('.edit-button'));

    expect(editButton).toBeTruthy();

    const editQuestionSpy = spyOn(component, 'editQuestion');
    editButton.triggerEventHandler('click', null);

    expect(editQuestionSpy).toHaveBeenCalled();
    wait(fixture);
    tick(800);
  }));
});
