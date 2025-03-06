export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'fr' as const;

export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/projects': '/projects',
  '/contact': '/contact'
} as const; 