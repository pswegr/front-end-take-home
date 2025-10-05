import { Component, Input, HostBinding, input, computed, output, model, ChangeDetectionStrategy } from '@angular/core';

type MessageType = 'error' | 'warning' | 'info' | 'success';
type MessagePosition = 'top' | 'bottom';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.html',
  styleUrl: './message-bar.scss',
  host: { '[class]': 'hostClass()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageBar {
  // ---- signal inputs ----
  title = input<string>('');
  message = input<string>('');
  type = input<MessageType>('info');
  position = input<MessagePosition>('top');
  visible = model<boolean>(true);
  dissmissible = input<boolean>(true);
  buttonPosition = input<'after' | 'bottom' | 'none'>('none');

  // ---- new output() API ----
  dismissed = output<void>();

  button1Text = input<string>('Placeholder');
  button2Text = input<string>('Placeholder');
  buttton1Clicked = output<void>();
  buttton2Clicked = output<void>();

  ariaLive = computed(() => (this.type() === 'error' ? 'assertive' : 'polite'));

  buttonMode = computed(() => {
    const type = this.type();
    if(type === 'error' || type === 'info' ) {
      if (this.buttonPosition() === 'after') return 'after';
      if (this.buttonPosition() === 'bottom') return 'bottom';
      return 'none';
    }
    return 'none';
  });

  // host class string based on signal inputs
  hostClass = computed(() => {
    const cls = [];
    if (!this.visible()) cls.push('hidden');
    cls.push(`type-${this.type()}`, `pos-${this.position()}`);
    return cls.join(' ');
  });

  // icon as computed string (kept inline SVG, no deps)
  iconSvg = computed(() => {
    switch (this.type()) {
      case 'success': return `
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path d="M9 16.2 4.8 12a1 1 0 1 0-1.4 1.4l5.2 5.2a1 1 0 0 0 1.4 0L21.6 7a1 1 0 1 0-1.4-1.4L9 16.2z"/>
        </svg>`;
      case 'warning': return `
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>`;
      case 'error': return `
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm3.536 12.95a1 1 0 1 1-1.414 1.415L12 13.414l-2.121 2.95a1 1 0 0 1-1.415-1.415L10.586 12 8.464 9.879A1 1 0 0 1 9.88 8.464L12 10.586l2.121-2.122a1 1 0 1 1 1.415 1.415L13.414 12l2.122 2.121z"/>
        </svg>`;
      default: return `
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
          <path d="M11 9h2V7h-2v2zm0 8h2v-6h-2v6zm1-15a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2z"/>
        </svg>`;
    }
  });

  hide() {
    this.visible.set(false);     // update the signal input locally
    this.dismissed.emit();       // fire the new-style output
  }
}
