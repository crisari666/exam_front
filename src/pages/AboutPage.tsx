import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../shared/components';
import './Pages.css';

const AboutPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <header className="page-header">
        <h1>{t('pages.about.title')}</h1>
        <LanguageSwitcher />
      </header>
      
      <main>
        <p>{t('pages.about.description')}</p>
        <p>We follow a feature-first architecture for better code organization.</p>
        
        <nav>
          <ul>
            <li><a href="/">{t('navigation.home')}</a></li>
            <li><a href="/dashboard">{t('navigation.dashboard')}</a></li>
            <li><a href="/exam">{t('navigation.exam')}</a></li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default AboutPage;
