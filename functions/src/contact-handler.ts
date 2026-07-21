import { ContactRateLimiter } from './rate-limiter.js';
import { ContactPayload, escapeHtml, validateContactPayload } from './validation.js';

const MAX_BODY_BYTES = 16_384;
const allowedOrigins = new Set([
  'https://atsiestudio.com',
  'https://www.atsiestudio.com',
  'http://127.0.0.1:5000',
  'http://localhost:5000',
  'http://localhost:4200',
]);

const projectTypeLabels: Readonly<Record<string, string>> = {
  web: 'Desarrollo web',
  custom: 'Desarrollo personalizado',
  maintenance: 'Mantenimiento web',
  hosting: 'Hosting y dominios',
  other: 'Otro o no estoy seguro',
};

const budgetLabels: Readonly<Record<string, string>> = {
  '690-1290': 'De 690 € a 1.290 €',
  '1290-2490': 'De 1.290 € a 2.490 €',
  '2490-5000': 'De 2.490 € a 5.000 €',
  'more-than-5000': 'Más de 5.000 €',
  'not-defined': 'Aún no lo tengo definido',
};

interface RequestLike {
  method: string;
  body: unknown;
  ip?: string;
  rawBody?: Uint8Array;
  get(name: string): string | undefined;
}

interface ResponseLike {
  set(name: string, value: string): ResponseLike;
  status(code: number): ResponseLike;
  json(body: unknown): void;
}

interface TurnstileResult {
  success: boolean;
  action?: string;
  hostname?: string;
}

export interface ContactHandlerDependencies {
  fetch: typeof fetch;
  logger: {
    error(message: string, data: Record<string, string>): void;
    warn(message: string, data: Record<string, string>): void;
  };
  rateLimiter: ContactRateLimiter;
  resendApiKey: string;
  turnstileSecretKey: string;
}

export async function handleContactRequest(
  request: RequestLike,
  response: ResponseLike,
  dependencies: ContactHandlerDependencies,
): Promise<void> {
  response.set('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.set('Allow', 'POST').status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const origin = request.get('origin');
  if (origin && !isAllowedOrigin(origin)) {
    response.status(403).json({ error: 'origin_not_allowed' });
    return;
  }

  const contentType = request.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.startsWith('application/json')) {
    response.status(415).json({ error: 'unsupported_media_type' });
    return;
  }

  const declaredLength = Number(request.get('content-length') ?? 0);
  if (
    (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) ||
    (request.rawBody?.byteLength ?? 0) > MAX_BODY_BYTES
  ) {
    response.status(413).json({ error: 'payload_too_large' });
    return;
  }

  const rateLimit = dependencies.rateLimiter.check(clientAddress(request));
  if (!rateLimit.allowed) {
    logRejection('rate_limited', dependencies);
    response
      .set('Retry-After', String(rateLimit.retryAfterSeconds))
      .status(429)
      .json({ error: 'too_many_requests' });
    return;
  }

  const validation = validateContactPayload(request.body);
  if (!validation.valid) {
    logRejection(validation.reason, dependencies);
    response.status(400).json({ error: 'invalid_request' });
    return;
  }
  const payload = validation.payload;

  try {
    const verification = await verifyTurnstile(payload.turnstileToken, dependencies);
    if (!verification.success || verification.action !== 'contact' || !verification.hostname) {
      logRejection('verification_failed', dependencies);
      response.status(400).json({ error: 'verification_failed' });
      return;
    }

    if (!isAllowedHostname(verification.hostname)) {
      logRejection('verification_failed', dependencies);
      response.status(400).json({ error: 'verification_failed' });
      return;
    }

    const delivered = await deliverContactEmail(payload, dependencies);
    if (!delivered) {
      dependencies.logger.error('Contact delivery failed', {
        event: 'contact_delivery_failed',
        reason: 'provider_rejected',
      });
      response.status(502).json({ error: 'delivery_failed' });
      return;
    }

    response.status(200).json({ success: true });
  } catch {
    dependencies.logger.error('Contact delivery failed', {
      event: 'contact_delivery_failed',
      reason: 'upstream_unavailable',
    });
    response.status(502).json({ error: 'delivery_failed' });
  }
}

function clientAddress(request: RequestLike): string | undefined {
  const forwardedAddress = request.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwardedAddress || request.ip;
}

function logRejection(reason: string, dependencies: ContactHandlerDependencies): void {
  dependencies.logger.warn('Contact request rejected', {
    event: 'contact_rejected',
    reason,
  });
}

function isAllowedOrigin(origin: string): boolean {
  return (
    allowedOrigins.has(origin) || /^https:\/\/atsi-estudio--[a-z0-9-]+\.web\.app$/.test(origin)
  );
}

function isAllowedHostname(hostname: string): boolean {
  return (
    hostname === 'atsiestudio.com' ||
    hostname === 'www.atsiestudio.com' ||
    hostname === 'localhost' ||
    /^atsi-estudio--[a-z0-9-]+\.web\.app$/.test(hostname)
  );
}

async function verifyTurnstile(
  token: string,
  dependencies: ContactHandlerDependencies,
): Promise<TurnstileResult> {
  const response = await dependencies.fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: dependencies.turnstileSecretKey,
        response: token,
      }),
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) return { success: false };
  return (await response.json()) as TurnstileResult;
}

async function deliverContactEmail(
  payload: ContactPayload,
  dependencies: ContactHandlerDependencies,
): Promise<boolean> {
  const response = await dependencies.fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${dependencies.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ATSIestudio <contacto@atsiestudio.com>',
      to: ['contacto@atsiestudio.com'],
      reply_to: payload.email,
      subject: `Nueva solicitud web: ${payload.name.replace(/[\r\n]+/g, ' ')}`,
      html: contactEmailHtml(payload),
      text: contactEmailText(payload),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  return response.ok;
}

function contactEmailHtml(payload: ContactPayload): string {
  const projectType = projectTypeLabels[payload.projectType] ?? payload.projectType;
  const budget = budgetLabels[payload.budget] ?? payload.budget;
  const phone = payload.phone
    ? `<p><strong>Teléfono:</strong> ${escapeHtml(payload.phone)}</p>`
    : '';
  const company = payload.company
    ? `<p><strong>Empresa:</strong> ${escapeHtml(payload.company)}</p>`
    : '';
  return `<h1>Nueva solicitud desde ATSIestudio</h1><p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p><p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>${phone}${company}<p><strong>Tipo:</strong> ${escapeHtml(projectType)}</p><p><strong>Presupuesto:</strong> ${escapeHtml(budget)}</p><p><strong>Mensaje:</strong></p><p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>`;
}

function contactEmailText(payload: ContactPayload): string {
  const projectType = projectTypeLabels[payload.projectType] ?? payload.projectType;
  const budget = budgetLabels[payload.budget] ?? payload.budget;
  const phone = payload.phone ? `Teléfono: ${payload.phone}\n` : '';
  const company = payload.company ? `Empresa: ${payload.company}\n` : '';
  return `Nueva solicitud desde ATSIestudio\n\nNombre: ${payload.name}\nEmail: ${payload.email}\n${phone}${company}Tipo: ${projectType}\nPresupuesto: ${budget}\n\nMensaje:\n${payload.message}`;
}
