import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Question } from 'src/app/models/question';
import { containText, findEl, hasText } from 'src/test.helpers';
import { QuestionItemComponent } from './question-item.component';

describe('QuestionItemComponent', () => {
  let component: QuestionItemComponent;
  let fixture: ComponentFixture<QuestionItemComponent>;
  const question: Question = new Question();
  question.id = '123s783oasm34oo8ucx';
  question.name = 'Josefa';
  question.votes = 3;
  question.title = '¿por qué el cielo es azul?';
  question.description =
    'siempre vemos el cielo azul pero nunca preguntamos por qué';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionItemComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatListModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    givenAAComponent();
    thenExistTheComponent();
  });

  it('show question data', fakeAsync(() => {
    givenAAComponentWithAQuestion();
    thenQuestionDataIsShown();
  }));

  it('should emit edit event', fakeAsync(() => {
    givenAAComponentWithAQuestion();
    whenClickOnEditButtonThenVotedIsEmitted();
  }));

  it('should emit vote event', fakeAsync(() => {
    givenAAComponentWithAQuestion();
    whenClickOnEditButtonThenEditButtonClickedIsEmitted();
  }));

  function givenAAComponent() {
    fixture = TestBed.createComponent(QuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function givenAAComponentWithAQuestion() {
    component.question = question;
    fixture.detectChanges();
    flush();
  }

  function thenExistTheComponent() {
    expect(component).toBeTruthy();
  }

  function thenQuestionDataIsShown() {
    hasText(fixture, '.question-title', question.title);
    containText(fixture, '.question-name', question.name);
    hasText(fixture, '.question-description', question.description);
  }

  function whenClickOnEditButtonThenVotedIsEmitted() {
    const voteButton = findEl(fixture, '.vote-button');
    expect(voteButton).toBeTruthy();

    let spy = spyOn(component.voted, 'emit');
    voteButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }

  function whenClickOnEditButtonThenEditButtonClickedIsEmitted() {
    const moreButton = findEl(fixture, '.more-button');
    expect(moreButton).toBeTruthy();
    moreButton.triggerEventHandler('click', null);

    const editButton = moreButton.query(By.css('.edit-button'));
    let spy = spyOn(component.editButtonClicked, 'emit');
    editButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    flush();
  }
});
