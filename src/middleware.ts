import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/settings';

export default createMiddleware({
  // Une liste des locales supportées
  locales,
  
  // La locale par défaut
  defaultLocale,
  
  // Optionnel: Définir un préfixe de locale pour toutes les routes
  localePrefix: 'always'
});

// Uniquement les pages qui doivent être gérées par le middleware
export const config = {
  matcher: [
    // Correspond à toutes les routes qui commencent par /
    '/',
    // Correspond à toutes les routes qui commencent par /fr ou /en
    '/(fr|en)/:path*',
    // Exclut les fichiers statiques et les API
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}; 