export type AnalyticsConsent = 'granted' | 'denied' | 'undecided';

export interface StoredConsentPreferences {
  version: 1;
  analytics: Exclude<AnalyticsConsent, 'undecided'>;
  updatedAt: string;
}
