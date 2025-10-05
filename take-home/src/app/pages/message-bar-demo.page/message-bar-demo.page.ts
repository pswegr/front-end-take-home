import { Component } from '@angular/core';
import { MessageBarService } from '../../../shared/services/message-bar.service';

@Component({
  selector: 'app-message-bar-demo.page',
  imports: [],
  templateUrl: './message-bar-demo.page.html',
  styleUrl: './message-bar-demo.page.scss'
})
export class MessageBarDemoPage {
  constructor(private msg: MessageBarService) {}

  save() {
    this.msg.info('Saving', 'Your changes are saving.', { durationMs: 3000, dissmissible: false });
    this.msg.error('Cannot save', 'Validation failed.', { durationMs: 5000 });
  }
  warn() {
    this.msg.warning('Heads up', 'Quota at 90%.', { durationMs: 0 }); // persistent
  }
  err() {
    this.msg.error('Cannot save', 'Validation failed.', { durationMs: 5000, dissmissible: false, buttonPosition: 'bottom' });
  }
  info() {
    this.msg.info('Notice', 'We’ll deploy at 22:00.', { position: 'bottom', durationMs: 4000 , dissmissible: true, buttonPosition: 'after'});
  }
}
