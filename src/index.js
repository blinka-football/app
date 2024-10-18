import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import AuthProvider from './AuthProvider';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
