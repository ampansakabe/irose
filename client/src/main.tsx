import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { TenantProvider } from './hooks/useTenantContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TenantProvider>
        <App />
      </TenantProvider>
    </React.StrictMode>
  );
}
