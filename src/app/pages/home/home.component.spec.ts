import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { QuestionMockService } from 'src/app/services/question.mock.service';
import { QuestionService } from 'src/app/services/question.service';
import { TimerMockService } from 'src/app/services/timer-mock.service';
import { TimerService } from 'src/app/services/timer.service';
import { VotingService } from 'src/app/services/voting.service';
import { environment } from 'src/environments/environment';
import { containText, findEl } from 'src/test.helpers';

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
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: QuestionService, useClass: QuestionMockService },
        { provide: VotingService, useClass: VotingService },
        { provide: TimerService, useClass: TimerMockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and show waiting', () => {
    expect(component).toBeTruthy();
    const waitingComponent = findEl(fixture, '#spinner');
    expect(waitingComponent).toBeTruthy();
  });

  it('should show topics section', fakeAsync(() => {
    fixture = TestBed.createComponent(HomeComponent);
    wait(fixture);
    const topicSection = findEl(fixture, '#topics-section');
    console.log('topicSection', topicSection);
    expect(topicSection).toBeTruthy();

    tick(800);
    containText(fixture, '#topics-section', 'Temas a conversar');
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
    expect(button).toBeTruthy();
    fixture.detectChanges();
    fixture.destroy();
    flush();
  }));

  // it('should vote a question', fakeAsync(() => {
  //   fail();
  // }));

  // it('should unvote a question', fakeAsync(() => {
  //   fail();
  // }));

  // it('select a topic', fakeAsync(() => {
  //   fail();
  // }));

  // it('select a topic and start a timer', fakeAsync(() => {
  //   fail();
  // }));

  // it('should reset all votes', fakeAsync(() => {
  //   fail();
  // }));

  // it('should open edit question dialog', fakeAsync(() => {
  //   fail();
  // }));
});

function wait(fixture: ComponentFixture<HomeComponent>): void {
  fixture.detectChanges();
  tick(800);

  fixture.detectChanges();
  tick(800);

  fixture.detectChanges();
}
