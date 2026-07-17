import { randomUUID } from 'node:crypto';

import { defineSecret } from 'firebase-functions/params';
import { onRequest } from 'firebase-functions/v2/https';

import { escapeHtml, parseContactPayload } from './validation.js';

const resendApiKey = defineSecret('RESEND_API_KEY');
const turnstileSecretKey = defineSecret('TURNSTILE_SECRET_KEY');

interface TurnstileResult {
  success: boolean;
  action?: string;
}

export const submitContact = onRequest(
  {
    region: 'europe-west1',
    secrets: [resendApiKey, turnstileSecretKey],
    timeoutSeconds: 30,
    memory: '256MiB',
    maxInstances: 10,
    cors: false,
  },
  async (request, response) => {
    response.set('Cache-Control', 'no-store');
    if (request.method !== 'POST') {
      response.set('Allow', 'POST').status(405).json({ error: 'method_not_allowed' });
      return;
    }

    const payload = parseContactPayload(request.body);
    if (!payload) {
      response.status(400).json({ error: 'invalid_request' });
      return;
    }

    try {
      const turnstileResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: turnstileSecretKey.value(),
            response: payload.turnstileToken,
          }),
          signal: AbortSignal.timeout(10_000),
        },
      );
      const verification = (await turnstileResponse.json()) as TurnstileResult;
      if (!turnstileResponse.ok || !verification.success || verification.action !== 'contact') {
        response.status(400).json({ error: 'verification_failed' });
        return;
      }

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey.value()}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': randomUUID(),
        },
        body: JSON.stringify({
          from: 'ATSIestudio <contacto@atsiestudio.com>',
          to: ['adriantejedor96@gmail.com'],
          reply_to: payload.email,
          subject: `Nueva solicitud web: ${escapeHtml(payload.name)}`,
          html: contactEmailHtml(payload),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!emailResponse.ok) throw new Error('Email provider rejected request');
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Contact delivery failed', error instanceof Error ? error.message : 'unknown');
      response.status(502).json({ error: 'delivery_failed' });
    }
  },
);

function contactEmailHtml(payload: NonNullable<ReturnType<typeof parseContactPayload>>): string {
  const company = payload.company
    ? `<p><strong>Empresa:</strong> ${escapeHtml(payload.company)}</p>`
    : '';
  return `<h1>Nueva solicitud desde ATSIestudio</h1><p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p><p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>${company}<p><strong>Tipo:</strong> ${escapeHtml(payload.projectType)}</p><p><strong>Mensaje:</strong></p><p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>`;
}
