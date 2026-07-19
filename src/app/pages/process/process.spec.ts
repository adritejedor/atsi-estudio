import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Process } from './process';

describe('Process', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('renders one main heading and an ordered five-stage process', () => {
    const fixture = TestBed.createComponent(Process);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelectorAll('.stage-list > li')).toHaveLength(5);
    expect(element.querySelectorAll('h2').length).toBeGreaterThanOrEqual(4);
  });

  it('explains responsibilities and links both calls to action to contact', () => {
    const fixture = TestBed.createComponent(Process);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('.responsibility-grid article')).toHaveLength(2);
    expect(element.textContent).toContain('ATSIestudio');
    expect(element.textContent).toContain('La empresa');
    expect(element.querySelectorAll('a[href="/contacto"]')).toHaveLength(2);
  });
});
