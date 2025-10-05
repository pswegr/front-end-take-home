import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageBarContainer } from '../shared/components/message/message-bar-container/message-bar-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageBarContainer ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('take-home');
}
