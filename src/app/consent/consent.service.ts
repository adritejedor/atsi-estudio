import { Injectable, afterNextRender, signal } from '@angular/core';

import { AnalyticsConsent, StoredConsentPreferences } from './consent.models';

const CONSENT_STORAGE_KEY = 'atsi-consent-preferences';
const CONSENT_VERSION = 1;

@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly analytics = signal<AnalyticsConsent>('undecided');
  readonly initialized = signal(false);
  readonly settingsOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      this.analytics.set(this.readStoredChoice());
      this.initialized.set(true);
    });
  }

  choose(analytics: Exclude<AnalyticsConsent, 'undecided'>): void {
    const preferences: StoredConsentPreferences = {
      version: CONSENT_VERSION,
      analytics,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // The in-memory choice still applies when storage is unavailable.
    }

    this.analytics.set(analytics);
    this.settingsOpen.set(false);
  }

  openSettings(): void {
    this.settingsOpen.set(true);
  }

  closeSettings(): void {
    this.settingsOpen.set(false);
  }

  private readStoredChoice(): AnalyticsConsent {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);

      if (!stored) {
        return 'undecided';
      }

      const preferences = JSON.parse(stored) as Partial<StoredConsentPreferences>;
      const isCurrentVersion = preferences.version === CONSENT_VERSION;
      const choice = preferences.analytics;
      const isValidChoice = choice === 'granted' || choice === 'denied';

      return isCurrentVersion && isValidChoice ? choice : 'undecided';
    } catch {
      return 'undecided';
    }
  }
}
