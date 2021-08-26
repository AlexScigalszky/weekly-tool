import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/models/question';
import { QuestionItemModalComponent } from './question-item-modal.component';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { findEl, setValueTo } from 'src/test.helpers';

describe('QuestionItemModalComponent', () => {
  let component: QuestionItemModalComponent;
  let fixture: ComponentFixture<QuestionItemModalComponent>;
  let question: Question = new Question();
  question.id = '123434';
  question.name = 'name 123';
  question.votes = 12323;
  question.title = 'title 123';
  question.description = 'description 123';
  let titleInput: DebugElement;
  let descriptionInput: DebugElement;
  let nameInput: DebugElement;
  let createButton: DebugElement;
  let cancelButton: DebugElement;
  const dialogMock = {
    close: (data: any): any => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionItemModalComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: question },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    titleInput = findEl(fixture, '#title')!;
    descriptionInput = findEl(fixture, '#description')!;
    nameInput = findEl(fixture, '#name')!;
    createButton = findEl(fixture, '#create-button')!;
    cancelButton = findEl(fixture, '#cancel-button')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(titleInput.nativeElement).toBeTruthy();
    expect(descriptionInput.nativeElement).toBeTruthy();
    expect(nameInput.nativeElement).toBeTruthy();
    expect(createButton.nativeElement).toBeTruthy();
    expect(cancelButton.nativeElement).toBeTruthy();
  });

  it('should show question data to edit', () => {
    component.question = question;
    fixture.detectChanges();

    expect(titleInput.nativeElement.value).toBe(question.title);
    expect(descriptionInput.nativeElement.value).toBe(question.description);
    expect(nameInput.nativeElement.value).toBe(question.name);
  });

  it('create must return a new question', () => {
    setValueTo(titleInput, question.title);
    setValueTo(descriptionInput, question.description);
    setValueTo(nameInput, question.name);

    fixture.detectChanges();

    expect(titleInput.nativeElement.value).toBe(question.title);
    expect(descriptionInput.nativeElement.value).toBe(question.description);
    expect(nameInput.nativeElement.value).toBe(question.name);

    let createSpy = spyOn(component, 'create');
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createSpy).toHaveBeenCalled();
    expect(component.question).toEqual(question);
  });

  it('create must NO return any question', async () => {
    let onNoClickSpy = spyOn(component, 'onNoClick');

    cancelButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(onNoClickSpy).toHaveBeenCalled();
  });
});
