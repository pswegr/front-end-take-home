import { computed, Injectable, signal } from '@angular/core';

export type MessageType = 'error' | 'warning' | 'info' | 'success';
export type MessagePosition = 'top' | 'bottom';
export type MessageButtonPosition = 'after' | 'bottom' | 'none';

export interface MessageOptions {
  position?: MessagePosition;
  dissmissible?: boolean;
  /** Auto-hide after this many ms. Set 0 (or negative) to persist until closed. Default 5000. */
  durationMs?: number;
}

export interface MessageWithButtonsOptions {
  position?: MessagePosition;
  dissmissible?: boolean;
  buttonPosition?: MessageButtonPosition;
  /** Auto-hide after this many ms. Set 0 (or negative) to persist until closed. Default 5000. */
  durationMs?: number;
  button1Text?: string;
  button2Text?: string;
}

export interface QueuedMessage {
  id: number;
  type: MessageType;
  title?: string;
  message?: string;
  dissmissible?: boolean;
  position: MessagePosition;
  buttonPosition?: MessageButtonPosition;
  button1Text?: string;
  button2Text?: string;
  /** 0 means persistent */
  durationMs: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageBarService {
   private _queue = signal<QueuedMessage[]>([]);
  private _current = signal<QueuedMessage | null>(null);

  /** Public read-only signals */
  queue = computed(() => this._queue());
  current = computed(() => this._current());

  /** Timer / pause bookkeeping */
  private timerHandle: any = null;
  private startedAt = 0;
  private remainingMs = 0;
  private isPaused = false;

  /** API helpers */
  info(title: string, message?: string, opts?: MessageWithButtonsOptions)    { this.enqueue('info', title, message, opts); }
  success(title: string, message?: string, opts?: MessageOptions) { this.enqueue('success', title, message, opts); }
  warning(title: string, message?: string, opts?: MessageOptions) { this.enqueue('warning', title, message, opts); }
  error(title: string, message?: string, opts?: MessageWithButtonsOptions)   { this.enqueue('error', title, message, opts); }

  enqueue(type: MessageType, title?: string, message?: string, opts?: MessageOptions | MessageWithButtonsOptions) {
    const now = Date.now();
    const item: QueuedMessage = {
      id: now + Math.floor(Math.random()*1000),
      type,
      title,
      message,
      dissmissible: opts?.dissmissible ?? true,
      buttonPosition:  'buttonPosition' in (opts ?? {}) ? (opts as MessageWithButtonsOptions).buttonPosition ?? 'none' : 'none',
      button1Text: 'button1Text' in (opts ?? {}) ? (opts as MessageWithButtonsOptions).button1Text ?? 'Placeholder' : undefined,
      button2Text: 'button2Text' in (opts ?? {}) ? (opts as MessageWithButtonsOptions).button2Text ?? 'Placeholder' : undefined,
      position: opts?.position ?? 'top',
      durationMs: Number.isFinite(opts?.durationMs ?? 5000) ? Math.max(0, opts!.durationMs ?? 5000) : 5000,
    };
    this._queue.update(q => [...q, item]);
    this.kick();
  }

  /** Called by container when user presses the X. */
  dismissCurrent() {
    if (!this._current()) return;
    this.clearTimer();
    this._current.set(null);
    this.kick();
  }

  button1Action() {
    // placeholder for future extension
  }

  button2Action() {
    // placeholder for future extension
  }

  /** Hover to pause/resume */
  pause() {
    if (!this._current() || this.isPaused) return;
    if (this.timerHandle) {
      const elapsed = Date.now() - this.startedAt;
      this.remainingMs = Math.max(0, this.remainingMs - elapsed);
      this.clearTimer();
      this.isPaused = true;
    }
  }
  resume() {
    if (!this._current() || !this.isPaused) return;
    this.isPaused = false;
    if (this.remainingMs > 0) {
      this.startTimer(this.remainingMs);
    }
  }

  /** Internals */
  private kick() {
    if (this._current()) return;                    // already showing one
    const [next, ...rest] = this._queue();
    if (!next) return;                              // nothing to show
    this._queue.set(rest);
    this._current.set(next);

    // Set up timer
    if (next.durationMs > 0) {
      this.remainingMs = next.durationMs;
      this.isPaused = false;
      this.startTimer(this.remainingMs);
    } else {
      this.remainingMs = 0; // persistent
    }
  }

  private startTimer(ms: number) {
    this.clearTimer();
    this.startedAt = Date.now();
    this.timerHandle = setTimeout(() => {
      this.timerHandle = null;
      // auto advance
      this._current.set(null);
      this.kick();
    }, ms);
  }

  private clearTimer() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
  }
}
