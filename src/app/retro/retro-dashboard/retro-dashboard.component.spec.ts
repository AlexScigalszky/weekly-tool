import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { findEls, wait } from 'src/test.helpers';
import { RetroData } from '../models/retro-data';
import { RetroService } from '../services/retro.service';

import { RetroDashboardComponent } from './retro-dashboard.component';

describe('RetroDashboardComponent', () => {
  let component: RetroDashboardComponent;
  let fixture: ComponentFixture<RetroDashboardComponent>;
  let retro = new RetroData();
  retro.keep = [
    {
      id: 'string',
      text: 'keep',
    },
  ];
  retro.lessOf = [
    {
      id: 'string',
      text: 'lessOf',
    },
  ];
  retro.moreOf = [
    {
      id: 'string',
      text: 'moreOf',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [RetroDashboardComponent],
      providers: [
        {
          provide: RetroService,
          useValue: {
            list: () => of(retro),
            retrosIds: () => of([]),
            setRoom: (_: string) => new Promise<void>((r) => r()),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 'default' } },
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

  it('have three columns', fakeAsync(() => {
    const columns: DebugElement[] = findEls(fixture, '.retro-column')!;
    fixture.detectChanges();
    wait(fixture);
    console.log('alex', columns);
    expect(columns).toHaveSize(3);
  }));

  // it('have more-of column', () => {
  //   containText(fixture, '.more-of', 'Algo bueno / Más de...')!;
  // });

  // it('have keep column', () => {
  //   containText(
  //     fixture,
  //     '.keep',
  //     'Algo ni muy muy ni tantan / Mantengamos...',
  //   )!;
  // });

  // it('have less of', () => {
  //   containText(fixture, '.less-of', 'Algo malo / Menos de...')!;
  // });

  // it('have more-of input', () => {
  //   const input = findEl(fixture, '.more-of input');
  //   expect(input).toBeTruthy();
  // });

  // it('have keep input', () => {
  //   const input = findEl(fixture, '.keep input');
  //   expect(input).toBeTruthy();
  // });

  // it('have less input', () => {
  //   const input = findEl(fixture, '.less-of input');
  //   expect(input).toBeTruthy();
  // });

  // it('have more-of item list', () => {
  //   const list = findEl(fixture, '.more-of .list');
  //   expect(list).toBeTruthy();
  // });

  // it('have keep item list', () => {
  //   const list = findEl(fixture, '.keep .list');
  //   expect(list).toBeTruthy();
  // });

  // it('have less item list', () => {
  //   const list = findEl(fixture, '.less-of .list');
  //   expect(list).toBeTruthy();
  // });
  // /********************************/
  // it('have to add a new opinion in more of section', () => {
  //   const input = findEl(fixture, '.more-of input');
  //   setValueTo(input, 'un nuevo comentario');
  //   const event = new KeyboardEvent('keypress', {
  //     key: 'Enter',
  //   });
  //   input.nativeElement.dispatchEvent(event);
  //   fixture.detectChanges();
  //   const list = findEl(fixture, '.less-of ul');
  //   expect(list.children.length).toBeGreaterThan(0);
  // });
});
