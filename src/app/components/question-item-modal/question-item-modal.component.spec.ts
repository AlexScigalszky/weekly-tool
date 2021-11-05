import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/models/question';
import { QuestionItemModalComponent } from './question-item-modal.component';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { findEl, setValueTo, wait } from 'src/test.helpers';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';

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
        HttpClientModule,
        NgxEditorModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: question },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    givenAAComponent();
    thenThereAreInputs();
  });

  it('should show question data to edit', fakeAsync(() => {
    givenAAComponentWithAQuestion();
    whenTheComponentIsRefresh();
    thenThereAreInputsWithData();
  }));

  it('create must return a new question', () => {
    givenAAComponent();
    whenInputAreFilled();
    thenANewQuestionIsEmited();
  });

  it('create must NO return any question', async () => {
    givenAAComponentWithAQuestion();
    whenCancelButtonIsClickedThenNotEmitValue();
  });

  it('should close the dialog on cancel ', async () => {
    givenAAComponentWithAQuestion();
    whenCancelButtonIsClickedThenCloseTheDialog();
  });

  it('should close the dialog with data on  confirm', async () => {
    givenAAComponentWithAQuestion();
    whenCreateThenReturnQuestion();
  });

  function givenAAComponent() {
    fixture = TestBed.createComponent(QuestionItemModalComponent);
    component = fixture.componentInstance;
    titleInput = findEl(fixture, '#title')!;
    descriptionInput = findEl(fixture, '#description')!;
    nameInput = findEl(fixture, '#name')!;
    createButton = findEl(fixture, '#create-button')!;
    cancelButton = findEl(fixture, '#cancel-button')!;
    fixture.detectChanges();
  }

  function givenAAComponentWithAQuestion() {
    fixture = TestBed.createComponent(QuestionItemModalComponent);
    component = fixture.componentInstance;
    titleInput = findEl(fixture, '#title')!;
    descriptionInput = findEl(fixture, '#description')!;
    nameInput = findEl(fixture, '#name')!;
    createButton = findEl(fixture, '#create-button')!;
    cancelButton = findEl(fixture, '#cancel-button')!;
    component.question = question;
    fixture.detectChanges();
  }

  function thenThereAreInputs() {
    expect(titleInput.nativeElement).toBeTruthy();
    expect(descriptionInput.nativeElement).toBeTruthy();
    expect(nameInput.nativeElement).toBeTruthy();
    expect(createButton.nativeElement).toBeTruthy();
    expect(cancelButton.nativeElement).toBeTruthy();
  }

  function whenTheComponentIsRefresh() {
    wait(fixture);
    fixture.detectChanges();
  }

  function thenThereAreInputsWithData() {
    expect(titleInput.nativeElement.value).toBe(question.title);
    expect(nameInput.nativeElement.value).toBe(question.name);
  }

  function whenInputAreFilled() {
    setValueTo(titleInput, question.title);
    setValueTo(descriptionInput, question.description);
    setValueTo(nameInput, question.name);
    fixture.detectChanges();
  }

  function thenANewQuestionIsEmited() {
    expect(titleInput.nativeElement.value).toBe(question.title);
    expect(descriptionInput.nativeElement.value).toBe(question.description);
    expect(nameInput.nativeElement.value).toBe(question.name);

    let createSpy = spyOn(component, 'create');
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createSpy).toHaveBeenCalled();
    expect(component.question).toEqual(question);
  }

  function whenCancelButtonIsClickedThenNotEmitValue() {
    let onNoClickSpy = spyOn(component, 'onNoClick');
    cancelButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(onNoClickSpy).toHaveBeenCalled();
  }

  function whenCancelButtonIsClickedThenCloseTheDialog() {
    let closeSpy = spyOn(component.dialogRef, 'close');
    component.onNoClick();
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalled();
  }

  function whenCreateThenReturnQuestion() {
    let closeSpy = spyOn(component.dialogRef, 'close');
    component.question = question;
    component.create();
    expect(closeSpy).toHaveBeenCalledWith(question);
  }
});
