export interface PageMetadata {
  description: string;
  canonicalPath?: string;
  robots?: 'index,follow' | 'noindex,follow' | 'noindex,nofollow';
}
