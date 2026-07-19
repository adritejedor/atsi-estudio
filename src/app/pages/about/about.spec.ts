import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { About } from './about';

describe('About', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('renders one main heading and the verified business context', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.textContent).toContain('Segovia');
    expect(element.textContent).toContain('pymes de España');
    expect(element.querySelectorAll('.principle-list > li')).toHaveLength(4);
  });

  it('links to the process and contact routes', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('a[href="/como-trabajamos"]')).toBeTruthy();
    expect(element.querySelectorAll('a[href="/contacto"]')).toHaveLength(2);
  });
});
