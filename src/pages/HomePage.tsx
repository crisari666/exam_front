import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../shared/components';
import './Pages.css';

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <AppHeader title={t('pages.home.title')} />
      
      <main style={{ padding: '24px' }}>
        <h2>{t('pages.home.subtitle')}</h2>
        <p>{t('pages.home.description')}</p>
        
        <nav>
          <ul>
            <li><a href="/about">{t('navigation.about')}</a></li>
            <li><a href="/dashboard">{t('navigation.dashboard')}</a></li>
            <li><a href="/exam">{t('navigation.exam')}</a></li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default HomePage;
