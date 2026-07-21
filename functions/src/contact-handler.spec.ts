import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { handleContactRequest } from './contact-handler.js';
import { ContactRateLimiter } from './rate-limiter.js';

const validBody = {
  name: 'Ana',
  email: 'ana@example.com',
  phone: '+34 600 123 123',
  company: '',
  projectType: 'web',
  budget: '690-1290',
  message: 'Necesito una web profesional para mi empresa.',
  privacyAccepted: true,
  turnstileToken: 'valid-token',
  website: '',
  startedAt: Date.now() - 5_000,
};

class TestResponse {
  readonly headers = new Map<string, string>();
  statusCode = 200;
  body: unknown;

  set(name: string, value: string): this {
    this.headers.set(name, value);
    return this;
  }

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  json(body: unknown): void {
    this.body = body;
  }
}

function request(
  overrides: Partial<{
    body: unknown;
    headers: Record<string, string>;
    method: string;
    rawBody: Uint8Array;
  }> = {},
) {
  const headers = {
    'content-type': 'application/json',
    origin: 'https://atsi-estudio--provisional-6idpiz2u.web.app',
    ...overrides.headers,
  };
  return {
    method: overrides.method ?? 'POST',
    ip: '203.0.113.10',
    body: overrides.body ?? validBody,
    rawBody:
      overrides.rawBody ?? new TextEncoder().encode(JSON.stringify(overrides.body ?? validBody)),
    get(name: string): string | undefined {
      return headers[name.toLowerCase() as keyof typeof headers];
    },
  };
}

function dependencies(responses: Response[]) {
  const calls: Array<{ input: string; init?: RequestInit }> = [];
  const logs: Array<{ data: Record<string, string>; level: 'error' | 'warn'; message: string }> =
    [];
  const fetchMock = (async (input: string | URL | Request, init?: RequestInit) => {
    calls.push({ input: input.toString(), init });
    const response = responses.shift();
    if (!response) throw new Error('Unexpected fetch');
    return response;
  }) as typeof fetch;

  return {
    calls,
    logs,
    value: {
      fetch: fetchMock,
      logger: {
        error: (message: string, data: Record<string, string>) =>
          logs.push({ data, level: 'error', message }),
        warn: (message: string, data: Record<string, string>) =>
          logs.push({ data, level: 'warn', message }),
      },
      rateLimiter: new ContactRateLimiter(100),
      resendApiKey: 'resend-secret',
      turnstileSecretKey: 'turnstile-secret',
    },
  };
}

describe('contact HTTP handler', () => {
  it('rejects unsupported origins and oversized payloads before external requests', async () => {
    const external = dependencies([]);
    const forbidden = new TestResponse();
    await handleContactRequest(
      request({ headers: { origin: 'https://malicious.example' } }),
      forbidden,
      external.value,
    );
    assert.equal(forbidden.statusCode, 403);

    const oversized = new TestResponse();
    await handleContactRequest(
      request({ rawBody: new Uint8Array(16_385) }),
      oversized,
      external.value,
    );
    assert.equal(oversized.statusCode, 413);
    assert.equal(external.calls.length, 0);
  });

  it('rejects a failed Turnstile verification without contacting Resend', async () => {
    const external = dependencies([
      Response.json({ success: false, action: 'contact', hostname: 'atsiestudio.com' }),
    ]);
    const response = new TestResponse();
    await handleContactRequest(request(), response, external.value);

    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, { error: 'verification_failed' });
    assert.equal(external.calls.length, 1);
  });

  it('rate limits repeated requests without sending personal data to logs', async () => {
    const external = dependencies([]);
    external.value.rateLimiter = new ContactRateLimiter(1, 60_000, () => 1_000);
    external.value.rateLimiter.check('198.51.100.20');
    const response = new TestResponse();
    await handleContactRequest(
      request({ headers: { 'x-forwarded-for': '198.51.100.20, 203.0.113.20' } }),
      response,
      external.value,
    );

    assert.equal(response.statusCode, 429);
    assert.equal(response.headers.get('Retry-After'), '60');
    assert.equal(external.calls.length, 0);
    assert.equal(JSON.stringify(external.logs).includes(validBody.email), false);
    assert.equal(JSON.stringify(external.logs).includes(validBody.phone), false);
    assert.equal(JSON.stringify(external.logs).includes(validBody.message), false);
    assert.deepEqual(external.logs[0]?.data, {
      event: 'contact_rejected',
      reason: 'rate_limited',
    });
  });

  it('delivers a verified request and returns the typed success response', async () => {
    const external = dependencies([
      Response.json({
        success: true,
        action: 'contact',
        hostname: 'atsi-estudio--provisional-6idpiz2u.web.app',
      }),
      Response.json({ id: 'email-id' }),
    ]);
    const response = new TestResponse();
    await handleContactRequest(request(), response, external.value);

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { success: true });
    assert.equal(external.calls[1]?.input, 'https://api.resend.com/emails');
    const emailBody = JSON.parse(String(external.calls[1]?.init?.body)) as Record<string, unknown>;
    assert.equal(emailBody['reply_to'], 'ana@example.com');
    assert.deepEqual(emailBody['to'], ['contacto@atsiestudio.com']);
    assert.equal(typeof emailBody['html'], 'string');
    assert.equal(typeof emailBody['text'], 'string');
    assert.match(String(emailBody['html']), /Teléfono:<\/strong> \+34 600 123 123/);
    assert.match(String(emailBody['html']), /Tipo:<\/strong> Desarrollo web/);
    assert.match(String(emailBody['html']), /Presupuesto:<\/strong> De 690 € a 1\.290 €/);
    assert.match(String(emailBody['text']), /Teléfono: \+34 600 123 123/);
    assert.match(String(emailBody['text']), /Tipo: Desarrollo web/);
    assert.match(String(emailBody['text']), /Presupuesto: De 690 € a 1\.290 €/);
  });

  it('does not deliver a duplicated Turnstile token twice', async () => {
    const external = dependencies([
      Response.json({ success: true, action: 'contact', hostname: 'atsiestudio.com' }),
      Response.json({ id: 'email-id' }),
      Response.json({
        success: false,
        'error-codes': ['timeout-or-duplicate'],
      }),
    ]);
    const firstResponse = new TestResponse();
    const duplicateResponse = new TestResponse();

    await handleContactRequest(request(), firstResponse, external.value);
    await handleContactRequest(request(), duplicateResponse, external.value);

    assert.equal(firstResponse.statusCode, 200);
    assert.equal(duplicateResponse.statusCode, 400);
    assert.equal(
      external.calls.filter(({ input }) => input === 'https://api.resend.com/emails').length,
      1,
    );
  });

  it('maps a provider rejection to a generic delivery error', async () => {
    const external = dependencies([
      Response.json({ success: true, action: 'contact', hostname: 'atsiestudio.com' }),
      Response.json({ message: 'rejected' }, { status: 500 }),
    ]);
    const response = new TestResponse();
    await handleContactRequest(request(), response, external.value);

    assert.equal(response.statusCode, 502);
    assert.deepEqual(response.body, { error: 'delivery_failed' });
  });
});
