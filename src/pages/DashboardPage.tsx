import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../shared/components';
import './Pages.css';

const DashboardPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-page">
      <AppHeader title={t('pages.dashboard.title')} />
      
      <main style={{ padding: '24px' }}>
        <p>{t('pages.dashboard.welcome')}</p>
        <p>Here you can manage your application.</p>
        
        <div className="dashboard-content">
          <div className="widget">
            <h3>{t('pages.dashboard.progress')}</h3>
            <p>Your application statistics will appear here.</p>
          </div>
          <div className="widget">
            <h3>{t('pages.dashboard.recent')}</h3>
            <p>Recent activities will be displayed here.</p>
          </div>
        </div>
        
        <nav>
          <ul>
            <li><a href="/">{t('navigation.home')}</a></li>
            <li><a href="/about">{t('navigation.about')}</a></li>
            <li><a href="/exam">{t('navigation.exam')}</a></li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default DashboardPage;
