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
    givenAComponent();
    thenExists();
  });

  it('should take route param', () => {
    givenAComponent();
    thenHaveDefaultRoomName();
  });

  it('should have retro-section', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveRetroSection();
  }));

  it('should have before-retro-input', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveBeforeRetroInput();
  }));

  it('should have before-section', fakeAsync(() => {
    givenAComponentWithBeforeRetroSelected();
    thenHaveBeforeSectionInput();
  }));

  it('have three columns', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveThreeRetroColumns();
  }));

  it('have more-of column', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveMoreOfColumn();
  }));

  it('have keep column', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveKeepColumn();
  }));

  it('have less of', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveLessOfColumn();
  }));

  it('have more-of input', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveMoreOfInput();
  }));

  it('have keep input', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveKeepInput();
  }));

  it('have less input', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveLessOfInput();
  }));

  it('have more-of item list', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveMoreOfItemList();
  }));

  it('have keep item list', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveKeepItemList();
  }));

  it('have less item list', fakeAsync(() => {
    givenAComponentAndWait();
    thenHaveLessOfItemList();
  }));

  function givenAComponent() {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function givenAComponentAndWait() {
    givenAComponent();
    wait(fixture);
  }

  function thenExists() {
    expect(component).toBeTruthy();
  }

  function thenHaveDefaultRoomName() {
    expect(component.room).toEqual('default-test');
  }

  function thenHaveRetroSection() {
    const elem = findEl(fixture, '.retro-section');
    expect(elem).toBeTruthy();
  }

  function thenHaveBeforeRetroInput() {
    const elem = findEl(fixture, ' #before-retro-input');
    expect(elem).toBeTruthy();
  }

  function givenAComponentWithBeforeRetroSelected() {
    fixture = TestBed.createComponent(RetroDashboardComponent);
    fixture.componentInstance.beforeRetroSelected = 'default-test';
    fixture.componentInstance.selectRetro();
    wait(fixture);
    fixture.detectChanges();
  }

  function thenHaveBeforeSectionInput() {
    const elem = findEl(fixture, '.before-section');
    expect(elem).toBeTruthy();
  }

  function thenHaveThreeRetroColumns() {
    const columns: DebugElement[] = findEls(fixture, '.retro-column')!;
    expect(columns.length).toBeGreaterThanOrEqual(3);
  }

  function thenHaveMoreOfColumn() {
    containText(fixture, '.more-of', '😍 Más de...')!;
  }

  function thenHaveKeepColumn() {
    containText(fixture, '.keep', '😇 Mantengamos...')!;
  }

  function thenHaveLessOfColumn() {
    containText(fixture, '.less-of', '😫 Menos de...')!;
  }

  function thenHaveMoreOfInput() {
    const input = findEl(fixture, '.more-of input');
    expect(input).toBeTruthy();
  }

  function thenHaveKeepInput() {
    const input = findEl(fixture, '.keep input');
    expect(input).toBeTruthy();
  }

  function thenHaveLessOfInput() {
    const input = findEl(fixture, '.less-of input');
    expect(input).toBeTruthy();
  }

  function thenHaveMoreOfItemList() {
    const list = findEl(fixture, '.more-of .list');
    expect(list).toBeTruthy();
  }

  function thenHaveKeepItemList() {
    const list = findEl(fixture, '.keep .list');
    expect(list).toBeTruthy();
  }

  function thenHaveLessOfItemList() {
    const list = findEl(fixture, '.less-of .list');
    expect(list).toBeTruthy();
  }
});
