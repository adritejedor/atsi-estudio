import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CustomDevelopment } from './custom-development/custom-development';
import { HostingDomains } from './hosting-domains/hosting-domains';
import { Maintenance } from './maintenance/maintenance';
import { Services } from './services/services';
import { WebDevelopment } from './web-development/web-development';

describe('Service pages', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it.each([
    ['services', Services],
    ['web development', WebDevelopment],
    ['custom development', CustomDevelopment],
    ['maintenance', Maintenance],
    ['hosting and domains', HostingDomains],
  ])('renders a unique heading and contact path for %s', async (_name, component) => {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent?.trim()).toBeTruthy();
    expect(element.querySelectorAll('h2').length).toBeGreaterThanOrEqual(2);
    expect(element.querySelector('a[href="/contacto"]')).toBeTruthy();
    if (component !== Services) {
      expect(element.textContent).toContain('Desde 1.000 €');
    }
  });

  it('links the service index to each service detail', () => {
    const fixture = TestBed.createComponent(Services);
    fixture.detectChanges();

    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>(
        '.service-cards a',
      ),
      (link) => link.getAttribute('href'),
    );

    expect(links).toEqual([
      '/servicios/desarrollo-web',
      '/servicios/desarrollo-personalizado',
      '/servicios/mantenimiento',
      '/servicios/hosting-y-dominios',
    ]);
  });
});
