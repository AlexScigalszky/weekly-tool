import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamonKillerComponent } from './damon-killer.component';

describe('DamonKillerComponent', () => {
  let component: DamonKillerComponent;
  let fixture: ComponentFixture<DamonKillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DamonKillerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamonKillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
