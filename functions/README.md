# Contact Function

`submitContact` validates contact requests, verifies Cloudflare Turnstile and delivers the message
through Resend. It does not persist leads or log their personal data.

The endpoint also uses a honeypot, a minimum completion time and an in-memory fixed-window limit of
eight requests per ten minutes and Function instance. Client addresses are represented only by an
ephemeral keyed hash in memory. The address is obtained from the forwarding chain added by Google
Cloud, with the request IP as fallback. This proportional limit reduces basic abuse without a
database, but it is not a distributed quota: review a managed rate limiter if traffic or abuse grows.

Application logs contain only aggregate technical categories and never submitted form fields.
Google Cloud still produces infrastructure request logs under its own retention configuration; audit
that metadata and retention as part of production privacy review.

## Required secrets

- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`

Production values belong in Google Secret Manager and must never be committed. For local emulator
tests, create an ignored `functions/.secret.local` file with those two keys.

## Commands

```text
npm --prefix functions test
npm --prefix functions run serve
```

The Hosting emulator exposes the application at `http://localhost:5000` and rewrites
`/api/contact` to the Function emulator. A complete local delivery test uses the real external
providers and can therefore consume quota and send an email.
