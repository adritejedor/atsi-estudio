import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ConsentPreferences } from './consent-preferences';
import { ConsentService } from './consent.service';

describe('ConsentPreferences', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ConsentPreferences],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('offers equivalent accept and reject actions before a choice', () => {
    const fixture = TestBed.createComponent(ConsentPreferences);
    const consent = TestBed.inject(ConsentService);
    consent.initialized.set(true);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const actions = element.querySelectorAll<HTMLButtonElement>(
      '.consent-banner .consent-actions button',
    );

    expect(actions).toHaveLength(2);
    expect(actions[0].textContent).toContain('Rechazar');
    expect(actions[1].textContent).toContain('Aceptar');
  });

  it('persists a versioned rejection without loading Google Analytics', () => {
    const fixture = TestBed.createComponent(ConsentPreferences);
    const consent = TestBed.inject(ConsentService);
    consent.initialized.set(true);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    element.querySelector<HTMLButtonElement>('.button-secondary')?.click();

    expect(consent.analytics()).toBe('denied');
    expect(localStorage.getItem('atsi-consent-preferences')).toContain('"version":1');
    expect(document.querySelector('#google-analytics-tag')).toBeNull();
  });
});
