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

  it('marks the legal notice as provisional and keeps real contact links', async () => {
    const fixture = await render(LegalNotice);
    const content = fixture.nativeElement as HTMLElement;

    expect(content.querySelector('h1')?.textContent).toContain('Aviso legal');
    expect(content.textContent).toContain('Borrador provisional');
    expect(content.querySelector('a[href="mailto:contacto@atsiestudio.com"]')).not.toBeNull();
    expect(content.querySelector('a[href="tel:+34655340607"]')).not.toBeNull();
  });

  it('describes the actual contact processors in the privacy draft', async () => {
    const fixture = await render(Privacy);
    const content = fixture.nativeElement as HTMLElement;

    expect(content.textContent).toContain('Google Firebase y Google Cloud');
    expect(content.textContent).toContain('Resend');
    expect(content.textContent).toContain('Cloudflare Turnstile');
  });

  it('states that Analytics is not active in the cookie draft', async () => {
    const fixture = await render(Cookies);
    const content = fixture.nativeElement as HTMLElement;

    expect(content.textContent).toContain('Google Analytics no está activo');
    expect(content.querySelector('table')).not.toBeNull();
  });
});
