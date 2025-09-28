import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations from index files
import englishTranslations from './english';
import arabicTranslations from './arabic';

// Constants
export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
} as const;

export const RTL_LANGUAGES = [LANGUAGES.AR] as const;
const STORAGE_KEY = 'i18nextLng';

// Available namespaces
export const NAMESPACES = [
  'login',
  'dashboard',
  'profile',
  'settings',
  'explore',
] as const;

// Detection configuration
const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  caches: ['localStorage'],
  lookupLocalStorage: STORAGE_KEY,
  checkWhitelist: true,
};

// Translation resources
const resources = {
  [LANGUAGES.EN]: englishTranslations,
  [LANGUAGES.AR]: arabicTranslations,
};

// Utility functions
export const getStoredLanguage = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return null;
  }
};

export const setStoredLanguage = (language: string): void => {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.warn('Failed to write to localStorage:', error);
  }
};

export const setDocumentDirection = (language: string): void => {
  const dir = (RTL_LANGUAGES as readonly string[]).includes(language)
    ? 'rtl'
    : 'ltr';

  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;

    document.documentElement.classList.remove('dir-ltr', 'dir-rtl');
    document.documentElement.classList.add(`dir-${dir}`);
  }
};

const initializeLanguage = (): string => {
  const storedLang = getStoredLanguage();
  const defaultLang = LANGUAGES.EN;

  const isValidLanguage =
    storedLang && Object.values(LANGUAGES).includes(storedLang as Language);
  const currentLang = isValidLanguage ? storedLang : defaultLang;

  setDocumentDirection(currentLang);

  if (!isValidLanguage && currentLang) {
    setStoredLanguage(currentLang);
  }

  return currentLang;
};

const currentLanguage = initializeLanguage();

const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        debug: process.env.NODE_ENV === 'development',

        lng: currentLanguage,
        fallbackLng: LANGUAGES.EN,
        supportedLngs: Object.values(LANGUAGES),
        load: 'languageOnly',

        detection: DETECTION_OPTIONS,

        ns: NAMESPACES,
        defaultNS: 'login',

        keySeparator: '.',
        nsSeparator: ':',

        interpolation: {
          escapeValue: false,
          formatSeparator: ',',
        },

        resources,

        react: {
          useSuspense: true,
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
        },
      });

    console.log('i18n initialized successfully');
  } catch (error) {
    console.error('i18n initialization failed:', error);
  }
};

i18n.on('languageChanged', (lng: string) => {
  setDocumentDirection(lng);
  setStoredLanguage(lng);
});

initI18n();

export const changeLanguage = async (language: string): Promise<void> => {
  await i18n.changeLanguage(language);
};

export const getCurrentLanguage = (): string => {
  return i18n.language || currentLanguage;
};

export const isRTL = (language?: string): boolean => {
  const lang = language || getCurrentLanguage();
  return (RTL_LANGUAGES as readonly string[]).includes(lang);
};

export const getAvailableLanguages = () => {
  return Object.values(LANGUAGES);
};

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
export type Namespace = (typeof NAMESPACES)[number];

export default i18n;
