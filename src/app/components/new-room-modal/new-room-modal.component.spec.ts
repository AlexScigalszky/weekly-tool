import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { findEl } from 'src/test.helpers';
import { NewRoomModalComponent } from './new-room-modal.component';

describe('NewRoomModalComponent', () => {
  let component: NewRoomModalComponent;
  let fixture: ComponentFixture<NewRoomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRoomModalComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatListModule,
        MatDialogModule,
        MatIconModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    givenAAComponent();
    thenExistTheComponent();
  });

  it('show an input for title with default text', fakeAsync(() => {
    givenAAComponent();
    tick();
    thenTitleInputHaveDefaultText();
  }));

  it('should call to create function', fakeAsync(() => {
    givenAAComponent();
    tick();
    whenCallToCreateFunctionThenCreateFuntionIsCalled();
  }));

  function givenAAComponent() {
    fixture = TestBed.createComponent(NewRoomModalComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }

  function thenExistTheComponent() {
    expect(component).toBeTruthy();
  }

  function thenTitleInputHaveDefaultText() {
    const titleInput = findEl(fixture, 'input');
    const d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const defaultValue = `${ye}-${mo}-${da}`;
    expect(titleInput).toBeTruthy();
    expect(titleInput.nativeElement.value).toEqual(defaultValue);
  }

  function whenCallToCreateFunctionThenCreateFuntionIsCalled() {
    let spy = spyOn(component, 'create');
    const createButton = findEl(fixture, '#create-button');
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }
});
