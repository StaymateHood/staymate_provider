import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';

export const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'te', label: 'తెలుగు'},
  {code: 'hi', label: 'हिंदी'},
] as const;

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    hi: {translation: hi},
    te: {translation: te},
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already handles XSS
  },
  compatibilityJSON: 'v4',
});

export default i18n;
