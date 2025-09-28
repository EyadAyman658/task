import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  changeLanguage,
  getCurrentLanguage,
  getAvailableLanguages,
} from '../localization/i18n';
import type { Language } from '../localization/i18n';

// Hook for language switching
export const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] =
    useState<string>(getCurrentLanguage());
  const availableLanguages = getAvailableLanguages();

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const switchLanguage = async (language: Language) => {
    try {
      await changeLanguage(language);
    } catch (error) {
      console.error('Failed to switch language:', error);
    }
  };

  const toggleLanguage = async () => {
    const currentIndex = availableLanguages.indexOf(
      currentLanguage as Language
    );
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLanguage = availableLanguages[nextIndex];
    await switchLanguage(nextLanguage);
  };

  return {
    currentLanguage,
    availableLanguages,
    switchLanguage,
    toggleLanguage,
  };
};
