import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { PageMetadata } from './page-metadata';

const SITE_ORIGIN = 'https://atsiestudio.com';
const SITE_NAME = 'ATSIestudio';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.updateMetadata());
  }

  private updateMetadata(): void {
    const route = this.getDeepestRoute(this.router.routerState.snapshot.root);
    const page = route.data['seo'] as PageMetadata | undefined;

    if (!page) {
      return;
    }

    const pageTitle = this.title.getTitle();
    const robots = page.robots ?? 'index,follow';

    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });

    if (page.canonicalPath) {
      const canonicalUrl = new URL(page.canonicalPath, SITE_ORIGIN).href;
      this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
      this.setCanonical(canonicalUrl);
    } else {
      this.meta.removeTag('property="og:url"');
      this.document.head.querySelector('link[rel="canonical"]')?.remove();
    }
  }

  private getDeepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;

    while (current.firstChild) {
      current = current.firstChild;
    }

    return current;
  }

  private setCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.append(canonical);
    }

    canonical.href = url;
  }
}
