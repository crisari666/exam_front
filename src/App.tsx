import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './App.css';

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
