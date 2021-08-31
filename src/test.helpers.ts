import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function setValueTo(element: DebugElement, value: string) {
  element.nativeElement.value = value;
  const event = document.createEvent('Event');
  event.initEvent('input', true, false);
  element.nativeElement.dispatchEvent(event);
}

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testId: string,
): DebugElement {
  return queryByCss<T>(fixture, testId);
}

export function findEls<T>(
  fixture: ComponentFixture<T>,
  testId: string,
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(testId));
}

export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));

  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}
