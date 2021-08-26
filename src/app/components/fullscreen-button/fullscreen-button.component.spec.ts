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
    expect(component).toBeTruthy();
    expect(component.isFullScreen).toBeFalse();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.fullscreen'));
    expect(button.nativeElement.textContent.trim()).toBe('Pantalla completa');
  });

  // it('open fullscreen', () => {
  //   component.openFullscreen();
  //   expect(component.isFullScreen).toBeTrue();
  //   fixture.detectChanges();
  //   const button = fixture.debugElement.query(By.css('.fullscreen'));
  //   expect(button.nativeElement.textContent.trim()).toBe(
  //     'Salir de pantalla completa',
  //   );
  // });

  // it('exit fullscreen', () => {
  //   component.closeFullscreen();
  //   expect(component.isFullScreen).toBeFalse();
  //   fixture.detectChanges();
  //   const button = fixture.debugElement.query(By.css('.fullscreen'));
  //   expect(button.nativeElement.textContent.trim()).toBe('Pantalla completa');
  // });
});
