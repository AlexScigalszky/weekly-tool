import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroInputComponent } from './retro-input.component';

describe('RetroInputComponent', () => {
  let component: RetroInputComponent;
  let fixture: ComponentFixture<RetroInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetroInputComponent],
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
