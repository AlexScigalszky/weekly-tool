import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { findEls } from 'src/test.helpers';

import { RetroDashboardComponent } from './retro-dashboard.component';

describe('RetroDashboardComponent', () => {
  let component: RetroDashboardComponent;
  let fixture: ComponentFixture<RetroDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetroDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('have three columns', () => {
    const columns: DebugElement[] = findEls(fixture, '.retro-column')!;
    expect(columns).toHaveSize(3);
  });
});
