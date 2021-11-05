import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { Partner } from 'src/app/models/partner';
import { containText, findEl } from 'src/test.helpers';

import { AniversariesComponent } from './aniversaries.component';

describe('AniversariesComponent', () => {
  let component: AniversariesComponent;
  let fixture: ComponentFixture<AniversariesComponent>;
  const partner = new Partner('Alguien', new Date());
  partner.id = '123';
  const aniversaries = [partner];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AniversariesComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AniversariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show aniversary icon', () => {
    givenAComponentWithAniversaries();
    whenTheComponentIsRefresh();
    thenExistsAniversaryIcon();
  });

  it('should show aniversary partners list', () => {
    givenAComponentWithAniversaries();
    whenTheComponentIsRefresh();
    thenExistsAListOfAniversaries();
  });

  it('should show aniversary partners items', () => {
    givenAComponentWithAniversaries();
    whenTheComponentIsRefresh();
    thenExistAnAniveraryItem();
    andContentAniversaryText();
  });

  function givenAComponentWithAniversaries() {
    expect(component).toBeTruthy();
    component.aniversaries = aniversaries;
  }

  function whenTheComponentIsRefresh() {
    fixture.detectChanges();
  }

  function thenExistsAniversaryIcon() {
    const aniversaryIcon = findEl(fixture, '.aniversary-icon');
    expect(aniversaryIcon).toBeTruthy();
  }

  function thenExistsAListOfAniversaries() {
    const aniversaryIcon = findEl(fixture, '.aniverary-partner-list');
    expect(aniversaryIcon).toBeTruthy();
  }

  function thenExistAnAniveraryItem() {
    const aniversaryIcon = findEl(fixture, '.aniverary-partner-list');
    expect(aniversaryIcon.children.length).toEqual(1);
  }

  function andContentAniversaryText() {
    containText(
      fixture,
      '.aniverary-partner-list',
      'Alguien hace 0 años que está trabajando con nosotros',
    );
  }
});
