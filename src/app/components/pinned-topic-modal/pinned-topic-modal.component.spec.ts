import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PinnedTopicModalComponent } from './pinned-topic-modal.component';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { findEl } from 'src/test.helpers';

describe('PinnedTopicModalComponent', () => {
  let component: PinnedTopicModalComponent;
  let fixture: ComponentFixture<PinnedTopicModalComponent>;
  // let question: Question = new Question();
  // question.id = '123434';
  // question.name = 'name 123';
  // question.votes = 12323;
  // question.title = 'title 123';
  // question.description = 'description 123';
  // let titleInput: DebugElement;
  // let descriptionInput: DebugElement;
  // let nameInput: DebugElement;
  // let createButton: DebugElement;
  // let cancelButton: DebugElement;
  const dialogMock = {
    close: (data: any): any => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinnedTopicModalComponent],
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
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PinnedTopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    givenAAComponent();
    thenExists();
  });

  it('have create button', () => {
    givenAAComponent();
    thenHaveCreateButton();
  });

  it('have cancel button', () => {
    givenAAComponent();
    thenHaveCancelButton();
  });

  it('have input', () => {
    // givenAAComponent();
    // thenThereAreInputs();
  });

  it('should save pinned topic', () => {
    // givenAAComponent();
    // thenThereAreInputs();
  });

  it('should show existed pinned topic', () => {
    // givenAAComponent();
    // thenThereAreInputs();
  });

  it('should update existed pinned topic', () => {
    // givenAAComponent();
    // thenThereAreInputs();
  });

  function givenAAComponent() {
    fixture = TestBed.createComponent(PinnedTopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function thenExists() {
    expect(component).toBeTruthy();
  }

  function thenHaveCreateButton() {
    const button = findEl(fixture, '#create-button');
    expect(button).toBeTruthy();
  }

  function thenHaveCancelButton() {
    const button = findEl(fixture, '#cancel-button');
    expect(button).toBeTruthy();
  }
  // function givenAAComponentWithAQuestion() {
  //   fixture = TestBed.createComponent(PinnedTopicModalComponent);
  //   component = fixture.componentInstance;
  //   titleInput = findEl(fixture, '#title')!;
  //   descriptionInput = findEl(fixture, '#description')!;
  //   nameInput = findEl(fixture, '#name')!;
  //   createButton = findEl(fixture, '#create-button')!;
  //   cancelButton = findEl(fixture, '#cancel-button')!;
  //   component.question = question;
  //   fixture.detectChanges();
  // }

  // function thenThereAreInputs() {
  //   expect(titleInput.nativeElement).toBeTruthy();
  //   expect(descriptionInput.nativeElement).toBeTruthy();
  //   expect(nameInput.nativeElement).toBeTruthy();
  //   expect(createButton.nativeElement).toBeTruthy();
  //   expect(cancelButton.nativeElement).toBeTruthy();
  // }

  // function whenTheComponentIsRefresh() {
  //   wait(fixture);
  //   fixture.detectChanges();
  // }

  // function thenThereAreInputsWithData() {
  //   expect(titleInput.nativeElement.value).toBe(question.title);
  //   expect(nameInput.nativeElement.value).toBe(question.name);
  // }

  // function whenInputAreFilled() {
  //   setValueTo(titleInput, question.title);
  //   setValueTo(descriptionInput, question.description);
  //   setValueTo(nameInput, question.name);
  //   fixture.detectChanges();
  // }

  // function thenANewQuestionIsEmited() {
  //   expect(titleInput.nativeElement.value).toBe(question.title);
  //   expect(descriptionInput.nativeElement.value).toBe(question.description);
  //   expect(nameInput.nativeElement.value).toBe(question.name);

  //   let createSpy = spyOn(component, 'create');
  //   createButton.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   expect(createSpy).toHaveBeenCalled();
  //   expect(component.question).toEqual(question);
  // }

  // function whenCancelButtonIsClickedThenNotEmitValue() {
  //   let onNoClickSpy = spyOn(component, 'onNoClick');
  //   cancelButton.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(onNoClickSpy).toHaveBeenCalled();
  // }

  // function whenCancelButtonIsClickedThenCloseTheDialog() {
  //   let closeSpy = spyOn(component.dialogRef, 'close');
  //   component.onNoClick();
  //   fixture.detectChanges();
  //   expect(closeSpy).toHaveBeenCalled();
  // }

  // function whenCreateThenReturnQuestion() {
  //   let closeSpy = spyOn(component.dialogRef, 'close');
  //   component.question = question;
  //   component.create();
  //   expect(closeSpy).toHaveBeenCalledWith(question);
  // }
});
