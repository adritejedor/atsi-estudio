import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AnalyticsService } from './analytics.service';
import { ConsentService } from './consent.service';

describe('AnalyticsService', () => {
  beforeEach(() => {
    document.querySelector('#google-analytics-tag')?.remove();
    window.dataLayer = undefined;
    window.gtag = undefined;
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  afterEach(() => {
    document.querySelector('#google-analytics-tag')?.remove();
    window.dataLayer = undefined;
    window.gtag = undefined;
  });

  it('does not load Google Analytics before consent', () => {
    TestBed.inject(AnalyticsService);

    expect(document.querySelector('#google-analytics-tag')).toBeNull();
  });

  it('loads the configured Google tag only after consent', () => {
    TestBed.inject(AnalyticsService);
    const consent = TestBed.inject(ConsentService);

    consent.choose('granted');
    TestBed.tick();

    const script = document.querySelector<HTMLScriptElement>('#google-analytics-tag');
    expect(script?.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-DZ2WCW1HP3');
  });
});
