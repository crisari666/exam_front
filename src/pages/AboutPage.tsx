import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../shared/components';
import './Pages.css';

const AboutPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <AppHeader title={t('pages.about.title')} />
      
      <main style={{ padding: '24px' }}>
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
