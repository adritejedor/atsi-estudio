import { createHmac, randomBytes } from 'node:crypto';

export interface RateLimitDecision {
  allowed: boolean;
  retryAfterSeconds: number;
}

interface RateLimitEntry {
  count: number;
  expiresAt: number;
}

export class ContactRateLimiter {
  private static readonly maximumTrackedClients = 10_000;
  private readonly entries = new Map<string, RateLimitEntry>();
  private readonly hashingKey = randomBytes(32);

  constructor(
    private readonly maximumRequests = 8,
    private readonly windowMilliseconds = 10 * 60 * 1000,
    private readonly now: () => number = Date.now,
  ) {}

  check(clientAddress: string | undefined): RateLimitDecision {
    const now = this.now();
    this.removeExpiredEntries(now);

    const key = createHmac('sha256', this.hashingKey)
      .update(clientAddress?.trim() || 'unknown')
      .digest('base64url');
    const current = this.entries.get(key);

    if (!current) {
      if (this.entries.size >= ContactRateLimiter.maximumTrackedClients) {
        const oldestKey = this.entries.keys().next().value as string | undefined;
        if (oldestKey) this.entries.delete(oldestKey);
      }
      this.entries.set(key, { count: 1, expiresAt: now + this.windowMilliseconds });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    current.count += 1;
    if (current.count <= this.maximumRequests) {
      return { allowed: true, retryAfterSeconds: 0 };
    }

    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.expiresAt - now) / 1000)),
    };
  }

  private removeExpiredEntries(now: number): void {
    for (const [key, entry] of this.entries) {
      if (entry.expiresAt <= now) this.entries.delete(key);
    }
  }
}
