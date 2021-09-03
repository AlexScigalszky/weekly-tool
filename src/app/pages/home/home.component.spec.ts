import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { QuestionMockService } from 'src/app/services/question.mock.service';
import { QuestionService } from 'src/app/services/question.service';
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
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: QuestionService, useClass: QuestionMockService },
        { provide: VotingService, useClass: VotingService },
        { provide: TimerService, useClass: TimerService },
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

    fixture.detectChanges();
    tick(800);

    fixture.detectChanges();
    tick(800);

    fixture.detectChanges();
    const topicSection = findEl(fixture, '#topics-section');
    console.log('topicSection', topicSection);
    expect(topicSection).toBeTruthy();

    tick(800);
    containText(fixture, '#topics-section', 'Temas a conversar');
  }));

  // it('should show the selected topic section', fakeAsync(() => {
  //   const topicSection = findEl(fixture, '#selected-topic');
  //   expect(topicSection).toBeTruthy();
  // }));
});
