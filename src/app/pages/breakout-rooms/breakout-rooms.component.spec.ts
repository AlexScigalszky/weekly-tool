import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakoutRoomsComponent } from './breakout-rooms.component';

describe('BreakoutRoomsComponent', () => {
  let component: BreakoutRoomsComponent;
  let fixture: ComponentFixture<BreakoutRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakoutRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakoutRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
