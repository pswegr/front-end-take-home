import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBar } from './message-bar';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MessageBar', () => {
  let component: MessageBar;
  let fixture: ComponentFixture<MessageBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBar],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
