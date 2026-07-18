import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { ContactRateLimiter } from './rate-limiter.js';

describe('contact rate limiter', () => {
  it('limits one client without affecting another and resets after the window', () => {
    let now = 1_000;
    const limiter = new ContactRateLimiter(2, 10_000, () => now);

    assert.equal(limiter.check('203.0.113.1').allowed, true);
    assert.equal(limiter.check('203.0.113.1').allowed, true);
    assert.deepEqual(limiter.check('203.0.113.1'), {
      allowed: false,
      retryAfterSeconds: 10,
    });
    assert.equal(limiter.check('203.0.113.2').allowed, true);

    now += 10_000;
    assert.equal(limiter.check('203.0.113.1').allowed, true);
  });
});
