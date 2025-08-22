import type { FC } from 'react';
import './Pages.css';

const HomePage: FC = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of our application.</p>
      <nav>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
