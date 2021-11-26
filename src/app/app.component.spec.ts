import { TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { VersionComponent } from './components/version/version.component';
import { PinnedTopicsService } from './services/pinned-topics.service';
import { QuestionService } from './services/question.service';

describe('AppComponent', () => {
  /**
   * https://stackoverflow.com/questions/48760093/how-to-provide-mock-angularfirestore-module-inside-angular-component-for-default
   * */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
      ],
      declarations: [AppComponent, VersionComponent],
      // I used 'useValue' because it is just a json. If it was class, I'd use 'useClass'
      providers: [
        { provide: MatDialog, useValue: { close: () => {}, open: () => {} } },
        { provide: MatDialogRef, useValue: {} },
        { provide: QuestionService, useValue: {} },
        { provide: PinnedTopicsService, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const app = givenAComponent();
    thenExists(app);
  });

  function givenAComponent() {
    const fixture = TestBed.createComponent(AppComponent);
    return fixture.componentInstance;
  }
  function thenExists(app) {
    expect(app).toBeTruthy();
  }
});
