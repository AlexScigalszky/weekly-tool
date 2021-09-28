import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { findEl, hasText } from 'src/test.helpers';
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
    expect(component).toBeTruthy();
  });

  it('show question data', () => {
    component.question = question;
    fixture.detectChanges();

    hasText(fixture, '.question-title h3', question.title);
    hasText(fixture, '.question-name', question.name);
    hasText(fixture, '.question-description', question.description);
  });

  it('emit edit event', () => {
    component.question = question;
    fixture.detectChanges();

    hasText(fixture, '.question-title h3', question.title);
    hasText(fixture, '.question-name', question.name);
    hasText(fixture, '.question-description', question.description);
  });

  it('should emit edit event', () => {
    component.question = question;
    fixture.detectChanges();

    const voteButton = findEl(fixture, '.vote-button');
    expect(voteButton).toBeTruthy();

    let spy = spyOn(component.voted, 'emit');
    voteButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit vote event', () => {
    component.question = question;
    fixture.detectChanges();

    const moreButton = findEl(fixture, '.more-button');
    expect(moreButton).toBeTruthy();
    moreButton.triggerEventHandler('click', null);

    const editButton = moreButton.query(By.css('.edit-button'));
    let spy = spyOn(component.editButtonClicked, 'emit');
    editButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
