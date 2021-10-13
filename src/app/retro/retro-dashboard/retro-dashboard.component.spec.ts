import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { containText, findEl, findEls, wait } from '../../../test.helpers';
import { RetroData } from '../models/retro-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RetroDashboardComponent } from './retro-dashboard.component';
import { RetroService } from '../services/retro.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from '../../app.module';
import { DebugElement } from '@angular/core';

describe('RetroDashboardComponent', () => {
  let component: RetroDashboardComponent;
  let fixture: ComponentFixture<RetroDashboardComponent>;
  let retro = {
    keep: [
      {
        id: 'string',
        text: 'keep',
      },
    ],
    lessOf: [
      {
        id: 'string',
        text: 'lessOf',
      },
    ],
    moreOf: [
      {
        id: 'string',
        text: 'moreOf',
      },
    ],
  } as RetroData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatCommonModule,
        ReactiveFormsModule,
        MatIconModule,
        AppModule,
      ],
      declarations: [RetroDashboardComponent],
      providers: [
        {
          provide: RetroService,
          useValue: {
            list: (_) => of(retro),
            retrosIds: () => of(['before']),
            setRoom: (room: string) => new Promise<void>((r) => r()),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { room: 'default-test' } },
          },
        },
      ],
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

  it('should take route param', () => {
    expect(component.room).toEqual('default-test');
  });

  it('should have retro-section', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const elem = findEl(fixture, '.retro-section');
    expect(elem).toBeTruthy();
  }));

  it('should have before-retro-input', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    // fixture.componentInstance.beforeRetroSelected = 'default-test';
    wait(fixture);
    const elem = findEl(fixture, ' #before-retro-input');
    expect(elem).toBeTruthy();
  }));

  it('should have before-section', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    fixture.componentInstance.beforeRetroSelected = 'default-test';
    fixture.componentInstance.selectRetro();
    wait(fixture);
    fixture.detectChanges();
    const elem = findEl(fixture, '.before-section');
    expect(elem).toBeTruthy();
  }));

  it('have three columns', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const columns: DebugElement[] = findEls(fixture, '.retro-column')!;
    expect(columns.length).toBeGreaterThanOrEqual(3);
  }));

  it('have more-of column', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    containText(fixture, '.more-of', '😍 Más de...')!;
  }));

  it('have keep column', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    containText(fixture, '.keep', '😇 Mantengamos...')!;
  }));

  it('have less of', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    containText(fixture, '.less-of', '😫 Menos de...')!;
  }));

  it('have more-of input', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const input = findEl(fixture, '.more-of input');
    expect(input).toBeTruthy();
  }));

  it('have keep input', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const input = findEl(fixture, '.keep input');
    expect(input).toBeTruthy();
  }));

  it('have less input', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const input = findEl(fixture, '.less-of input');
    expect(input).toBeTruthy();
  }));

  it('have more-of item list', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const list = findEl(fixture, '.more-of .list');
    expect(list).toBeTruthy();
  }));

  it('have keep item list', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const list = findEl(fixture, '.keep .list');
    expect(list).toBeTruthy();
  }));

  it('have less item list', fakeAsync(() => {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    wait(fixture);
    const list = findEl(fixture, '.less-of .list');
    expect(list).toBeTruthy();
  }));
});
