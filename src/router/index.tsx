import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import DashboardPage from '../pages/DashboardPage';
import ExamPage from '../features/exam/components/ExamPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/exam',
    element: <ExamPage />,
  },
]);
