export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  privacyAccepted: true;
  turnstileToken: string;
  website: string;
  startedAt: number;
}

export type ContactRejectionReason = 'honeypot' | 'invalid_payload' | 'timing';

export type ContactValidationResult =
  { valid: true; payload: ContactPayload } | { valid: false; reason: ContactRejectionReason };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\s-]*$/;
const projectTypes = new Set(['web', 'custom', 'maintenance', 'hosting', 'other']);
const budgets = new Set(['690-1290', '1290-2490', '2490-5000', 'more-than-5000', 'not-defined']);

export function parseContactPayload(value: unknown, now = Date.now()): ContactPayload | null {
  const result = validateContactPayload(value, now);
  return result.valid ? result.payload : null;
}

export function validateContactPayload(value: unknown, now = Date.now()): ContactValidationResult {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { valid: false, reason: 'invalid_payload' };
  }
  const body = value as Record<string, unknown>;
  const name = normalizedString(body['name']);
  const email = normalizedString(body['email']).toLowerCase();
  const phone = normalizedString(body['phone']);
  const company = normalizedString(body['company']);
  const projectType = normalizedString(body['projectType']);
  const budget = normalizedString(body['budget']);
  const message = normalizedString(body['message']);
  const turnstileToken = normalizedString(body['turnstileToken']);
  const website = normalizedString(body['website']);
  const startedAt = body['startedAt'];

  if (website !== '') return { valid: false, reason: 'honeypot' };
  if (
    typeof startedAt !== 'number' ||
    !Number.isFinite(startedAt) ||
    now - startedAt < 3000 ||
    now - startedAt > 7_200_000
  ) {
    return { valid: false, reason: 'timing' };
  }

  if (
    name.length < 1 ||
    name.length > 100 ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    phone.length > 30 ||
    !phonePattern.test(phone) ||
    company.length > 120 ||
    !projectTypes.has(projectType) ||
    !budgets.has(budget) ||
    message.length < 20 ||
    message.length > 3000 ||
    turnstileToken.length < 1 ||
    turnstileToken.length > 2048 ||
    body['privacyAccepted'] !== true
  )
    return { valid: false, reason: 'invalid_payload' };

  return {
    valid: true,
    payload: {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      message,
      privacyAccepted: true,
      turnstileToken,
      website,
      startedAt,
    },
  };
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] ??
      character,
  );
}

function normalizedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}
