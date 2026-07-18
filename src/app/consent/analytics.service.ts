import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, afterNextRender, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { ConsentService } from './consent.service';

const MEASUREMENT_ID = 'G-DZ2WCW1HP3';
const GOOGLE_TAG_SCRIPT_ID = 'google-analytics-tag';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly consent = inject(ConsentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private isLoaded = false;
  private lastTrackedPath = '';

  constructor() {
    effect(() => {
      const choice = this.consent.analytics();

      if (choice === 'granted') {
        this.loadGoogleTag();
      } else if (this.isLoaded) {
        this.revokeConsent();
      }
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => queueMicrotask(() => this.trackPageView()));

    afterNextRender(() => {
      this.document.addEventListener('click', this.trackContactClick);
      this.destroyRef.onDestroy(() =>
        this.document.removeEventListener('click', this.trackContactClick),
      );
    });
  }

  trackLead(): void {
    this.sendEvent('generate_lead');
  }

  private readonly trackContactClick = (event: Event): void => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest<HTMLAnchorElement>('a[href]');
    const href = link?.getAttribute('href') ?? '';

    if (href.startsWith('mailto:')) {
      this.sendEvent('contact_email');
    } else if (href.startsWith('tel:')) {
      this.sendEvent('contact_phone');
    } else if (href.startsWith('https://wa.me/')) {
      this.sendEvent('contact_whatsapp');
    }
  };

  private loadGoogleTag(): void {
    if (this.isLoaded || typeof window === 'undefined') {
      return;
    }

    this.isLoaded = true;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
      window.gtag ??
      function gtag(...args: unknown[]): void {
        window.dataLayer?.push(args);
      };

    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
    window.gtag('set', {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

    const script = this.document.createElement('script');
    script.id = GOOGLE_TAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.addEventListener('load', () => this.trackPageView(), { once: true });
    this.document.head.append(script);
  }

  private trackPageView(): void {
    if (!this.canTrack() || typeof window === 'undefined') {
      return;
    }

    const path = window.location.pathname;

    if (path === this.lastTrackedPath) {
      return;
    }

    this.lastTrackedPath = path;
    window.gtag?.('event', 'page_view', {
      page_location: `${window.location.origin}${path}`,
      page_path: path,
      page_title: this.title.getTitle(),
    });
  }

  private sendEvent(name: string): void {
    if (this.canTrack()) {
      window.gtag?.('event', name);
    }
  }

  private canTrack(): boolean {
    return this.isLoaded && this.consent.analytics() === 'granted';
  }

  private revokeConsent(): void {
    window.gtag?.('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    this.lastTrackedPath = '';
    this.deleteAnalyticsCookies();
  }

  private deleteAnalyticsCookies(): void {
    const names = ['_ga', `_ga_${MEASUREMENT_ID.slice(2)}`];
    const domains = ['', window.location.hostname, '.atsiestudio.com'];

    for (const name of names) {
      for (const domain of domains) {
        const domainAttribute = domain ? `;domain=${domain}` : '';
        this.document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainAttribute}`;
      }
    }
  }
}
