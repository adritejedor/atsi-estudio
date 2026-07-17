export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactRequest {
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

export interface ContactResponse {
  success: true;
}
