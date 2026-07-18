import { defineSecret } from 'firebase-functions/params';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';

import { handleContactRequest } from './contact-handler.js';
import { ContactRateLimiter } from './rate-limiter.js';

const resendApiKey = defineSecret('RESEND_API_KEY');
const turnstileSecretKey = defineSecret('TURNSTILE_SECRET_KEY');
const contactRateLimiter = new ContactRateLimiter();

export const submitContact = onRequest(
  {
    region: 'europe-west1',
    secrets: [resendApiKey, turnstileSecretKey],
    timeoutSeconds: 30,
    memory: '256MiB',
    maxInstances: 10,
    cors: false,
  },
  (request, response) =>
    handleContactRequest(request, response, {
      fetch,
      logger,
      rateLimiter: contactRateLimiter,
      resendApiKey: resendApiKey.value(),
      turnstileSecretKey: turnstileSecretKey.value(),
    }),
);
