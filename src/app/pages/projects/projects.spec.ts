import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Projects } from './projects';

describe('Projects', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('renders one real project without fictitious duplicates', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelectorAll('.project-card')).toHaveLength(1);
    expect(element.textContent).toContain('Proyecto real');
    expect(element.textContent).toContain('Skepsis Ink');
  });

  it('provides a descriptive image and safe external links', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const image = element.querySelector<HTMLImageElement>('.project-preview img');
    const externalLinks = element.querySelectorAll<HTMLAnchorElement>(
      'a[href="https://skepsisink.com"]',
    );

    expect(image?.getAttribute('alt')).toBeTruthy();
    expect(image?.getAttribute('width')).toBe('1440');
    expect(image?.getAttribute('height')).toBe('1000');
    expect(externalLinks).toHaveLength(2);
    externalLinks.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    });
  });

  it('links the call to action to contact', () => {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('a[href="/contacto"]'),
    ).toBeTruthy();
  });
});
