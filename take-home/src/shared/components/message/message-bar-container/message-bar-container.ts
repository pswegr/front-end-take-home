import { Component } from '@angular/core';
import { MessageBarService } from '../../../services/message-bar.service';
import { MessageBar } from '../message-bar/message-bar';

@Component({
  selector: 'app-message-bar-container',
  imports: [MessageBar],
  templateUrl: './message-bar-container.html',
  styleUrl: './message-bar-container.scss'
})
export class MessageBarContainer {
  constructor(public svc: MessageBarService) {}
}
