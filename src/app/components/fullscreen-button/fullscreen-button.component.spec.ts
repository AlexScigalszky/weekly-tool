import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FullscreenButtonComponent } from './fullscreen-button.component';

declare const viewport: any;

describe('FullscreenButtonComponent', () => {
  let component: FullscreenButtonComponent;
  let fixture: ComponentFixture<FullscreenButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullscreenButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenButtonComponent);
    component = fixture.componentInstance;
    component.elem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    givenAAComponent();
    thenIsFullscreenDisabled();
    whenTheComponentIsRefresh();
    thenFullscreenButtonShowPantallCompleta();
  });

  it('open fullscreen', () => {
    givenAAComponent();
    whenOpenFullscreen();
    thenFullscreenIsEnabled();
    whenTheComponentIsRefresh();
    thenFullscreenButtonShowSalirDePantallCompleta();
  });

  it('exit fullscreen', () => {
    givenAAComponentOpened();
    whenCloseFullscreen();
    thenIsFullscreenDisabled();
    whenTheComponentIsRefresh();
    thenFullscreenButtonShowPantallCompleta();
  });

  function givenAAComponent() {
    expect(component).toBeTruthy();
  }

  function givenAAComponentOpened() {
    expect(component).toBeTruthy();
    component.openFullscreen();
    fixture.detectChanges();
  }

  function thenIsFullscreenDisabled() {
    expect(component.isFullScreen).toBeFalse();
  }

  function whenTheComponentIsRefresh() {
    fixture.detectChanges();
  }

  function thenFullscreenButtonShowPantallCompleta() {
    const button = fixture.debugElement.query(By.css('.fullscreen'));
    expect(button.nativeElement.textContent.trim()).toBe('Pantalla completa');
  }

  function whenOpenFullscreen() {
    component.openFullscreen();
  }

  function thenFullscreenIsEnabled() {
    expect(component.isFullScreen).toBeTrue();
  }

  function thenFullscreenButtonShowSalirDePantallCompleta() {
    const button = fixture.debugElement.query(By.css('.fullscreen'));
    expect(button.nativeElement.textContent.trim()).toBe(
      'Salir de pantalla completa',
    );
  }

  function whenCloseFullscreen() {
    component.closeFullscreen();
  }
});
