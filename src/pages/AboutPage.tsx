import type { FC } from 'react';
import './Pages.css';

const AboutPage: FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>This is the about page where you can learn more about our application.</p>
      <p>We follow a feature-first architecture for better code organization.</p>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default AboutPage;
