import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBarDemoPage } from './message-bar-demo.page';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MessageBarDemoPage', () => {
  let component: MessageBarDemoPage;
  let fixture: ComponentFixture<MessageBarDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBarDemoPage],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBarDemoPage);
    component = fixture.componentInstance;
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
