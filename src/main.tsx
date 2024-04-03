import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './provider/appProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);