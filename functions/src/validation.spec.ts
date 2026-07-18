import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { escapeHtml, parseContactPayload, validateContactPayload } from './validation.js';

const now = 10_000;
const validPayload = {
  name: 'Ana',
  email: 'ana@example.com',
  company: '',
  projectType: 'web',
  message: 'Necesito una web profesional para mi empresa.',
  privacyAccepted: true,
  turnstileToken: 'token',
  website: '',
  startedAt: 5_000,
};

describe('contact validation', () => {
  it('accepts and normalizes a valid payload', () => {
    assert.deepEqual(parseContactPayload(validPayload, now)?.email, 'ana@example.com');
  });
  it('rejects honeypot, fast submissions and invalid email', () => {
    assert.equal(parseContactPayload({ ...validPayload, website: 'bot' }, now), null);
    assert.equal(parseContactPayload({ ...validPayload, startedAt: 9_000 }, now), null);
    assert.equal(parseContactPayload({ ...validPayload, email: 'invalid' }, now), null);
  });
  it('classifies antispam rejections without returning submitted data', () => {
    assert.deepEqual(validateContactPayload({ ...validPayload, website: 'bot' }, now), {
      valid: false,
      reason: 'honeypot',
    });
    assert.deepEqual(validateContactPayload({ ...validPayload, startedAt: 9_000 }, now), {
      valid: false,
      reason: 'timing',
    });
  });
  it('escapes content included in the email', () => {
    assert.equal(escapeHtml('<script>'), '&lt;script&gt;');
  });
});
