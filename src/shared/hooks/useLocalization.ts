import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };

  const getCurrentLanguage = (): string => {
    return i18n.language;
  };

  const isLanguage = (language: string): boolean => {
    return i18n.language === language;
  };

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    isLanguage,
    currentLanguage: i18n.language,
  };
};
