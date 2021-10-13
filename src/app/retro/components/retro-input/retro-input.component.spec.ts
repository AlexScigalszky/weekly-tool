import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RetroInputComponent } from './retro-input.component';

describe('RetroInputComponent', () => {
  let component: RetroInputComponent;
  let fixture: ComponentFixture<RetroInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetroInputComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatListModule,
        MatDialogModule,
        MatIconModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });
});
