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
  });

  it.each([
    [WebDevelopment, ['Desde 690 € + IVA', 'Desde 1.290 € + IVA', 'Desde 2.490 € + IVA']],
    [CustomDevelopment, ['Presupuesto cerrado']],
    [
      Maintenance,
      ['59 €/mes + IVA', '149 €/mes + IVA', 'Presupuesto a medida', 'no incluye el hosting'],
    ],
    [
      HostingDomains,
      [
        '19 €/mes o 190 €/año + IVA',
        'solo para proyectos de ATSIestudio',
        'no puede contratarse para proyectos que no hayan sido desarrollados por ATSIestudio',
      ],
    ],
  ])('shows the approved pricing and conditions for %s', (component, expectedContent) => {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    const content = (fixture.nativeElement as HTMLElement).textContent ?? '';

    for (const expected of expectedContent) {
      expect(content).toContain(expected);
    }
    expect(content).not.toContain('Desde 1.000 €');
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

    const content = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(content).toContain('Desde 690 € + IVA');
    expect(content).toContain('Desde 59 €/mes + IVA');
    expect(content).toContain('19 €/mes o 190 €/año + IVA');
  });
});
