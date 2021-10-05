import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { containText, findEl, findEls } from 'src/test.helpers';

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

  it('have more-of column', () => {
    containText(fixture, '.more-of', 'Algo bueno / Más de...')!;
  });

  it('have keep column', () => {
    containText(
      fixture,
      '.keep',
      'Algo ni muy muy ni tantan / Mantengamos...',
    )!;
  });

  it('have less of', () => {
    containText(fixture, '.less-of', 'Algo malo / Menos de...')!;
  });

  it('have more-of input', () => {
    const input = findEl(fixture, '.more-of input');
    expect(input).toBeTruthy();
  });

  it('have keep input', () => {
    const input = findEl(fixture, '.keep input');
    expect(input).toBeTruthy();
  });

  it('have less input', () => {
    const input = findEl(fixture, '.less-of input');
    expect(input).toBeTruthy();
  });
});