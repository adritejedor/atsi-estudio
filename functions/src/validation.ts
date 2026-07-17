export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  privacyAccepted: true;
  turnstileToken: string;
  website: string;
  startedAt: number;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const projectTypes = new Set(['web', 'custom', 'maintenance', 'hosting', 'other']);

export function parseContactPayload(value: unknown, now = Date.now()): ContactPayload | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const name = normalizedString(body['name']);
  const email = normalizedString(body['email']).toLowerCase();
  const company = normalizedString(body['company']);
  const projectType = normalizedString(body['projectType']);
  const message = normalizedString(body['message']);
  const turnstileToken = normalizedString(body['turnstileToken']);
  const website = normalizedString(body['website']);
  const startedAt = body['startedAt'];

  if (
    name.length < 1 ||
    name.length > 100 ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    company.length > 120 ||
    !projectTypes.has(projectType) ||
    message.length < 20 ||
    message.length > 3000 ||
    turnstileToken.length < 1 ||
    turnstileToken.length > 2048 ||
    website !== '' ||
    body['privacyAccepted'] !== true ||
    typeof startedAt !== 'number' ||
    !Number.isFinite(startedAt) ||
    now - startedAt < 3000 ||
    now - startedAt > 7_200_000
  )
    return null;

  return {
    name,
    email,
    company,
    projectType,
    message,
    privacyAccepted: true,
    turnstileToken,
    website,
    startedAt,
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
