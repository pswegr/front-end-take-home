import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBarContainer } from './message-bar-container';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MessageBarContainer', () => {
  let component: MessageBarContainer;
  let fixture: ComponentFixture<MessageBarContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBarContainer],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBarContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
