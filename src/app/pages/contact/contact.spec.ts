import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Turnstile } from '../../contact/turnstile';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }),
  );

  it('renders accessible contact links and one main heading', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    const emailLink = element.querySelector<HTMLAnchorElement>(
      'a[href="mailto:contacto@atsiestudio.com"]',
    );
    expect(emailLink).toBeTruthy();
    expect(emailLink?.textContent).toContain('contacto@atsiestudio.com');
    expect(element.querySelector('a[href="tel:+34655340607"]')).toBeTruthy();
    expect(element.querySelector('a[href="https://wa.me/34655340607"]')).toBeTruthy();
    expect(
      element.querySelector('a[href="https://wa.me/34655340607"] .external-link-icon'),
    ).toBeTruthy();
    expect(element.querySelector('input[autocomplete="tel"]')).toBeTruthy();
    expect(element.querySelectorAll('label').length).toBeGreaterThanOrEqual(8);
  });

  it('prevents an invalid submission, exposes an error and focuses the first invalid field', async () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    (fixture.nativeElement as HTMLElement).querySelector<HTMLFormElement>('form')?.requestSubmit();
    fixture.detectChanges();
    await Promise.resolve();

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('[role="alert"]')?.textContent,
    ).toContain('Revisa los campos');
    expect(document.activeElement?.id).toBe('name');
  });

  it('submits valid data once, renders and focuses the success state', async () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const component = fixture.componentInstance as unknown as {
      form: { patchValue(value: Record<string, unknown>): void };
    };
    component.form.patchValue({
      name: 'Ana',
      email: 'ana@example.com',
      phone: '+34 600 123 123',
      company: '',
      projectType: 'web',
      message: 'Necesito una web profesional para mi empresa.',
      privacyAccepted: true,
    });
    fixture.debugElement
      .query(By.directive(Turnstile))
      .componentInstance.tokenChange.emit('test-token');
    fixture.detectChanges();
    (fixture.nativeElement as HTMLElement).querySelector<HTMLFormElement>('form')?.requestSubmit();

    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.phone).toBe('+34 600 123 123');
    request.flush({ success: true });
    fixture.detectChanges();
    await Promise.resolve();

    const success = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '[role="status"]',
    );
    expect(success?.textContent).toContain('Mensaje enviado correctamente');
    expect(document.activeElement).toBe(success);
  });
});
