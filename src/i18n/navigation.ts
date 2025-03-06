import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './settings';

export const { Link } = createSharedPathnamesNavigation({ locales }); 