import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConsentService } from './consent.service';

@Component({
  selector: 'app-consent-preferences',
  imports: [RouterLink],
  templateUrl: './consent-preferences.html',
  styleUrl: './consent-preferences.scss',
})
export class ConsentPreferences {
  protected readonly consent = inject(ConsentService);
  private readonly settingsDialog = viewChild<ElementRef<HTMLDialogElement>>('settingsDialog');

  constructor() {
    effect(() => {
      const dialog = this.settingsDialog()?.nativeElement;

      if (!dialog) {
        return;
      }

      if (this.consent.settingsOpen() && !dialog.open) {
        dialog.showModal();
      } else if (!this.consent.settingsOpen() && dialog.open) {
        dialog.close();
      }
    });
  }

  protected closeFromDialog(): void {
    this.consent.closeSettings();
  }
}
