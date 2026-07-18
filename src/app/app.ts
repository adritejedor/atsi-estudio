import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  constructor() {
    inject(SeoService);
    inject(AnalyticsService);
  }
}
