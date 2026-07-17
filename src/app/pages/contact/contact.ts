import { Component, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { ContactRequest, ContactStatus } from '../../contact/contact.models';
import { ContactService } from '../../contact/contact.service';
import { Turnstile } from '../../contact/turnstile';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, Turnstile],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly status = signal<ContactStatus>('idle');
  protected readonly submitError = signal('');
  protected readonly turnstileToken = signal('');
  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    company: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(120)] }),
    projectType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20), Validators.maxLength(3000)],
    }),
    privacyAccepted: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
    website: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(0)] }),
  });

  private readonly contactService = inject(ContactService);
  private readonly turnstile = viewChild(Turnstile);
  private startedAt = Date.now();

  protected updateTurnstileToken(token: string): void {
    this.turnstileToken.set(token);
  }

  protected submit(): void {
    this.submitError.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitError.set('Revisa los campos indicados antes de enviar el formulario.');
      return;
    }

    if (!this.turnstileToken()) {
      this.submitError.set('Completa la verificación de seguridad antes de enviar.');
      return;
    }

    const value = this.form.getRawValue();
    const request: ContactRequest = {
      ...value,
      privacyAccepted: true,
      turnstileToken: this.turnstileToken(),
      startedAt: this.startedAt,
    };

    this.status.set('submitting');
    this.form.disable();
    this.contactService
      .submit(request)
      .pipe(
        finalize(() => {
          this.form.enable();
        }),
      )
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
          this.startedAt = Date.now();
          this.turnstile()?.reset();
        },
        error: () => {
          this.status.set('error');
          this.submitError.set(
            'No hemos podido enviar el mensaje. Inténtalo de nuevo o utiliza el email, teléfono o WhatsApp.',
          );
          this.turnstile()?.reset();
        },
      });
  }
}
