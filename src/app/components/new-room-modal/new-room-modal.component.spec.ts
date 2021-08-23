import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { NewRoomModalComponent } from './new-room-modal.component';
// Import {MatdialogModule,MatDialogRef} from '@angular/material/dialog';

describe('NewRoomModalComponent', () => {
  let component: NewRoomModalComponent;
  let fixture: ComponentFixture<NewRoomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRoomModalComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
