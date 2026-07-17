import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the global semantic layout', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('header')).toBeTruthy();
    expect(element.querySelector('main#main-content')).toBeTruthy();
    expect(element.querySelector('footer')).toBeTruthy();
    expect(element.querySelector<HTMLAnchorElement>('.skip-link')?.hash).toBe('#main-content');
  });
});
