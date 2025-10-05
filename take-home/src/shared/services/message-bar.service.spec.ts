import { TestBed } from '@angular/core/testing';

import { MessageBarService } from './message-bar.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MessageBarService', () => {
  let service: MessageBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(MessageBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
