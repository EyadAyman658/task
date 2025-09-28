import { useTranslation } from 'react-i18next';
import {
  changeLanguage,
  getCurrentLanguage,
  isRTL,
  getAvailableLanguages,
} from '../localization/i18n';
import type { Namespace } from '../localization/i18n';

export const useI18n = (namespace?: Namespace) => {
  const { t, i18n } = useTranslation(namespace || 'login');

  return {
    // Translation function
    t,

    // Language functions
    changeLanguage,
    currentLanguage: getCurrentLanguage(),
    availableLanguages: getAvailableLanguages(),

    // Direction utilities
    isRTL: isRTL(),
    direction: isRTL() ? 'rtl' : 'ltr',

    // i18n instance
    i18n,

    // Loading state
    isLoading: !i18n.isInitialized,
  };
};
