import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Question } from 'src/app/models/question';
import { findEl, findEls } from 'src/test.helpers';
import { QuestionItemComponent } from '../question-item/question-item.component';

import { QuestionListComponent } from './question-list.component';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let question = new Question();
  question.id = 'id';
  question.name = 'name';
  question.votes = 0;
  question.title = 'title';
  question.description = 'description';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
      ],
      declarations: [QuestionListComponent, QuestionItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    component.questions = [];
    component.highlight = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show empty list', () => {
    const list = findEl(fixture, '#question-list');
    expect(list.children.length).toEqual(0);
    expect(list).toBeTruthy();
  });

  it('show list with items', () => {
    component.questions = [question];
    fixture.detectChanges();
    const list = findEl(fixture, '#question-list');
    expect(list.children.length).toEqual(1);
  });

  it('show list with items not voted', () => {
    component.questions = [question];
    fixture.detectChanges();
    const list = findEl(fixture, '#question-list');
    expect(list.children.length).toEqual(1);
  });

  it('should emit edit event', () => {
    component.questions = [question];
    fixture.detectChanges();

    const elements = findEls(fixture, '.question-list-item');
    expect(elements.length).toEqual(1);

    const item = elements[0];
    const voteButton = item.query(By.css('.vote-button'));
    expect(voteButton).toBeTruthy();

    let spy = spyOn(component.voted, 'emit');
    voteButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit vote event', () => {
    component.questions = [question];
    fixture.detectChanges();

    const elements = findEls(fixture, '.question-list-item');
    expect(elements.length).toEqual(1);

    const item = elements[0];
    const moreButton = item.query(By.css('.more-button'));
    expect(moreButton).toBeTruthy();
    moreButton.triggerEventHandler('click', null);

    const editButton = item.query(By.css('.edit-button'));
    let spy = spyOn(component.editButtonClicked, 'emit');
    editButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
