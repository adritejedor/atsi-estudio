import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should expose the collapsed state and toggle the mobile navigation', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('.menu-toggle');
    const navigation = element.querySelector<HTMLElement>('#primary-navigation');

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(navigation?.classList.contains('is-open')).toBe(false);

    button?.click();
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('true');
    expect(navigation?.classList.contains('is-open')).toBe(true);
  });

  it('should close with Escape and restore focus to the menu button', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('.menu-toggle');

    button?.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
  });

  it('should close after selecting a navigation link', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('.menu-toggle');
    const link = element.querySelector<HTMLAnchorElement>('nav a');

    button?.click();
    link?.click();
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('false');
  });

  it('should clear the mobile state when resizing to desktop', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('.menu-toggle');
    const originalWidth = window.innerWidth;

    button?.click();
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 960 });
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
  });

  it('should link the primary call to action to contact', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const callToAction = element.querySelector<HTMLAnchorElement>('.contact-cta');

    expect(callToAction?.getAttribute('href')).toBe('/contacto');
  });

  it('should provide direct links to every service', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('.services-submenu a'),
      (link) => link.getAttribute('href'),
    );

    expect(links).toEqual([
      '/servicios/desarrollo-web',
      '/servicios/desarrollo-personalizado',
      '/servicios/mantenimiento',
      '/servicios/hosting-y-dominios',
    ]);
  });

  it('should provide the responsive brand assets', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const mobileSource = element.querySelector<HTMLSourceElement>('.wordmark source');
    const logo = element.querySelector<HTMLImageElement>('.wordmark img');

    expect(mobileSource?.getAttribute('srcset')).toBe('/images/atsi-estudio-symbol.svg');
    expect(logo?.getAttribute('src')).toBe('/images/atsi-estudio-logo.svg');
    expect(logo?.getAttribute('alt')).toBe('');
  });
});
