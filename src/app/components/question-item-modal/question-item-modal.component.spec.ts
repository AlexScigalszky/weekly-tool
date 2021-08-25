import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Question } from 'src/app/models/question';
import { QuestionItemModalComponent } from './question-item-modal.component';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

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
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: question },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    titleInput = fixture.debugElement.query(By.css('#title'))!;
    descriptionInput = fixture.debugElement.query(By.css('#description'))!;
    nameInput = fixture.debugElement.query(By.css('#name'))!;
    createButton = fixture.debugElement.query(By.css('#create-button'))!;
    cancelButton = fixture.debugElement.query(By.css('#cancel-button'))!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(titleInput.nativeElement).toBeTruthy();
    expect(descriptionInput.nativeElement).toBeTruthy();
    expect(nameInput.nativeElement).toBeTruthy();
    expect(createButton.nativeElement).toBeTruthy();
    expect(cancelButton.nativeElement).toBeTruthy();
  });

  it('should show question data to edit', fakeAsync(() => {
    component.question.title = question.name;
    fixture.detectChanges();

    tick();
    
    const input = fixture.debugElement.query(By.css('#title')).nativeElement;
    expect(input.value).toEqual('oldValue');
    // expect(titleInput.nativeElement.value).toBe(question.title);
    // expect(descriptionInput.nativeElement).toBe('question.description');
    // expect(nameInput.nativeElement).toBe(question.name);
  }));

  // it('create must return a new question', async () => {
  //   await sendInput(titleInput, question.title);
  //   await sendInput(descriptionInput, question.description);
  //   await sendInput(nameInput, question.name);
  //   fixture.detectChanges();

  //   expect(titleInput.nativeElement.textContent.trim()).toBe(question.title);
  //   expect(descriptionInput.nativeElement.textContent.trim()).toBe(
  //     question.description,
  //   );
  //   expect(nameInput.nativeElement.textContent.trim()).toBe(question.name);
  //   createButton.nativeElement.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   expect(component.create).toHaveBeenCalled();
  //   expect(component.dialogRef.close).toHaveBeenCalledWith(null);
  // });

  // it('create must NO return any question', async () => {
  //   await sendInput(titleInput, question.title);
  //   await sendInput(descriptionInput, question.description);
  //   await sendInput(nameInput, question.name);
  //   fixture.detectChanges();
  //   expect(titleInput.nativeElement.textContent.trim()).toBe(question.title);
  //   expect(descriptionInput.nativeElement.textContent.trim()).toBe(
  //     question.description,
  //   );
  //   expect(nameInput.nativeElement.textContent.trim()).toBe(question.name);

  //   cancelButton.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   expect(component.onNoClick).toHaveBeenCalled();
  //   expect(component.dialogRef.close).toHaveBeenCalledWith(null);
  // });

  // function sendInput(element: DebugElement, text: string) {
  //   element.nativeElement.addEventListener('input', function () {
  //     // Create and dispatch/trigger an event on the fly
  //     // Note: Optionally, we've also leveraged the "function expression" (instead of the "arrow function expression") so "this" will represent the element
  //     this.dispatchEvent(
  //       new CustomEvent('awesome', {
  //         bubbles: true,
  //         detail: { text: () => text },
  //       }),
  //     );
  //   });
  //   // element.nativeElement.value = text;
  //   // element.nativeElement.dispatchEvent(new Event('input'));
  //   // fixture.detectChanges();
  //   return fixture.whenStable();
  // }
});
