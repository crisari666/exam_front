import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string): void => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return (
    <div className={`language-switcher ${className}`}>
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('es')}
        className={`lang-btn ${currentLanguage === 'es' ? 'active' : ''}`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
};
