import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
