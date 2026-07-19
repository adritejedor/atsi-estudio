import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConsentService } from '../../consent/consent.service';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly consent = inject(ConsentService);
}
