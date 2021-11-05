import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionComponent } from './version.component';

describe('VersionComponent', () => {
  let component: VersionComponent;
  let fixture: ComponentFixture<VersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    givenAAComponent();
    thenExists();
    expect(fixture.debugElement.nativeElement.textContent.trim()).toContain(
      'v',
    );
  });

  it('should show version', () => {
    givenAAComponent();
    thenShowVersionText();
  });

  function givenAAComponent() {
    fixture = TestBed.createComponent(VersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function thenExists() {
    expect(component).toBeTruthy();
  }

  function thenShowVersionText() {
    expect(fixture.debugElement.nativeElement.textContent.trim()).toContain(
      'v',
    );
  }
});
