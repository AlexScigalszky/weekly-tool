import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { QuestionItemModalComponent } from './question-item-modal.component';

describe('QuestionItemModalComponent', () => {
  let component: QuestionItemModalComponent;
  let fixture: ComponentFixture<QuestionItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionItemModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
