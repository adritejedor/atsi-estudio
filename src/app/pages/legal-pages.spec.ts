import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Cookies } from './cookies/cookies';
import { LegalNotice } from './legal-notice/legal-notice';
import { Privacy } from './privacy/privacy';

describe('legal pages', () => {
  async function render<T>(component: Type<T>): Promise<ComponentFixture<T>> {
    await TestBed.configureTestingModule({
      imports: [component],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return fixture;
  }

  it('shows the definitive legal notice and keeps real contact links', async () => {
    const fixture = await render(LegalNotice);
    const content = fixture.nativeElement as HTMLElement;

    expect(content.querySelector('h1')?.textContent).toContain('Aviso legal');
    expect(content.querySelector('a[href="mailto:contacto@atsiestudio.com"]')).not.toBeNull();
    expect(content.querySelector('a[href="tel:+34655340607"]')).not.toBeNull();
  });

  it('describes the actual contact processors in the privacy policy', async () => {
    const fixture = await render(Privacy);
    const content = fixture.nativeElement as HTMLElement;

    expect(content.textContent).toContain('Google Firebase y Google Cloud');
    expect(content.textContent).toContain('Resend');
    expect(content.textContent).toContain('Cloudflare Turnstile');
  });

  it('states that Analytics requires consent in the cookie policy', async () => {
    const fixture = await render(Cookies);
    const content = fixture.nativeElement as HTMLElement;

    expect(content.textContent).toContain('solo se activa después');
    expect(content.querySelector('table')).not.toBeNull();
  });
});
