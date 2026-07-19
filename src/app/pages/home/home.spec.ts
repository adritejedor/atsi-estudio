import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should present one primary heading and the expected sections', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelectorAll('h2')).toHaveLength(6);
    expect(element.querySelectorAll('details')).toHaveLength(4);
    expect(element.querySelector('.visual-workspace')).toBeTruthy();
    expect(element.querySelector('.preview-panel')).toBeTruthy();
  });

  it('should provide descriptive links to services and contact', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = [...element.querySelectorAll<HTMLAnchorElement>('a')];

    expect(links.some((link) => link.getAttribute('href') === '/contacto')).toBe(true);
    expect(links.some((link) => link.getAttribute('href') === '/servicios/desarrollo-web')).toBe(
      true,
    );
    expect(links.every((link) => link.textContent?.trim())).toBe(true);
  });
});
