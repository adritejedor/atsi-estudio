import { routes } from '../app.routes';
import { PageMetadata } from './page-metadata';

describe('route SEO metadata', () => {
  const publicRoutes = routes.filter((route) => route.path !== '**');
  const metadata = publicRoutes.map((route) => route.data?.['seo'] as PageMetadata);

  it('defines a unique title and description for every public route', () => {
    const titles = publicRoutes.map((route) => route.title as string);
    const descriptions = metadata.map((page) => page.description);

    expect(titles.every(Boolean)).toBe(true);
    expect(descriptions.every(Boolean)).toBe(true);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it('defines canonicals only for routes ready to be indexed', () => {
    const indexable = metadata.filter((page) => (page.robots ?? 'index,follow') === 'index,follow');
    const provisional = metadata.filter((page) => page.robots === 'noindex,follow');

    expect(indexable.every((page) => page.canonicalPath?.startsWith('/'))).toBe(true);
    expect(provisional.every((page) => page.canonicalPath === undefined)).toBe(true);
  });
});
