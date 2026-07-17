import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      language: string;
      theme: 'light';
      size: 'flexible';
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

@Component({
  selector: 'app-turnstile',
  templateUrl: './turnstile.html',
  styleUrl: './turnstile.scss',
})
export class Turnstile implements OnDestroy {
  readonly tokenChange = output<string>();
  protected readonly hasError = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
  private widgetId: string | undefined;

  constructor() {
    afterNextRender(() => void this.initialize());
  }

  reset(): void {
    if (this.widgetId && window.turnstile) {
      window.turnstile.reset(this.widgetId);
      this.tokenChange.emit('');
    }
  }

  ngOnDestroy(): void {
    if (this.widgetId && window.turnstile) {
      window.turnstile.remove(this.widgetId);
    }
  }

  private async initialize(): Promise<void> {
    try {
      await this.loadScript();
      const siteKey = this.document
        .querySelector<HTMLMetaElement>('meta[name="turnstile-site-key"]')
        ?.content.trim();

      if (!siteKey || !window.turnstile) {
        this.hasError.set(true);
        return;
      }

      this.widgetId = window.turnstile.render(this.container().nativeElement, {
        sitekey: siteKey,
        action: 'contact',
        language: 'es',
        theme: 'light',
        size: 'flexible',
        callback: (token) => {
          this.hasError.set(false);
          this.tokenChange.emit(token);
        },
        'expired-callback': () => this.tokenChange.emit(''),
        'error-callback': () => {
          this.hasError.set(true);
          this.tokenChange.emit('');
        },
      });
    } catch {
      this.hasError.set(true);
    }
  }

  private loadScript(): Promise<void> {
    if (window.turnstile) {
      return Promise.resolve();
    }

    const existing = this.document.querySelector<HTMLScriptElement>('#turnstile-script');
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(), { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const script = this.document.createElement('script');
      script.id = 'turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener('error', () => reject(), { once: true });
      this.document.head.append(script);
    });
  }
}
