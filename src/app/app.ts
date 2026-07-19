import { Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AnalyticsService } from './consent/analytics.service';
import { ConsentPreferences } from './consent/consent-preferences';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';
import { SeoService } from './seo/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteFooter, SiteHeader, ConsentPreferences],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly mainContent = viewChild.required<ElementRef<HTMLElement>>('mainContent');

  constructor() {
    inject(SeoService);
    inject(AnalyticsService);

    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    let initialNavigationComplete = router.navigated;

    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe(() => {
        if (!initialNavigationComplete) {
          initialNavigationComplete = true;
          return;
        }

        queueMicrotask(() => this.mainContent().nativeElement.focus());
      });
  }
}
