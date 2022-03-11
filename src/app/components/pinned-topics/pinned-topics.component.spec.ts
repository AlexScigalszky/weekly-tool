import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { PinnedItem } from 'src/app/models/pinned-item';
import { findEls } from 'src/test.helpers';
import { PinnedTopicsComponent } from './pinned-topics.component';

describe('PinnedTopicsComponent', () => {
  let component: PinnedTopicsComponent;
  let fixture: ComponentFixture<PinnedTopicsComponent>;
  const item = new PinnedItem();
  item.id = '123';
  const topics = [item];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinnedTopicsComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    givenAComponent();
    expect(component).toBeTruthy();
  });

  it('should not show empty pinned topic', () => {
    givenAComponentWithEmptyPinnedTopics();
    whenTheComponentIsRefresh();
    thenNotShowPinnedText();
  });

  it('should show pinned text', () => {
    givenAComponentWithPinnedTopics();
    whenTheComponentIsRefresh();
    thenShowPinnedText();
  });

  function givenAComponent() {
    fixture = TestBed.createComponent(PinnedTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function givenAComponentWithPinnedTopics() {
    fixture = TestBed.createComponent(PinnedTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.topics = topics;
  }

  function givenAComponentWithEmptyPinnedTopics() {
    fixture = TestBed.createComponent(PinnedTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.topics = topics;
  }

  function whenTheComponentIsRefresh() {
    fixture.detectChanges();
  }

  function thenShowPinnedText() {
    const pinnedTopics = findEls(fixture, '.pinned-topic-item');
    expect(pinnedTopics.length).toBe(1);
  }

  function thenNotShowPinnedText() {
    const pinnedTopics = findEls(fixture, '.pinned-topic-item');
    expect(pinnedTopics.length).toBe(0);
  }
});
