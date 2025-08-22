import type { FC } from 'react';
import './Pages.css';

const DashboardPage: FC = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard. Here you can manage your application.</p>
      <div className="dashboard-content">
        <div className="widget">
          <h3>Quick Stats</h3>
          <p>Your application statistics will appear here.</p>
        </div>
        <div className="widget">
          <h3>Recent Activity</h3>
          <p>Recent activities will be displayed here.</p>
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardPage;
