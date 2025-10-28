import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import App from './App';
import AppErrorScreen from './interface/_error/AppErrorScreen';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReactErrorBoundary
      FallbackComponent={AppErrorScreen}
      onReset={() => window.location.replace('/')}
    >
      <App />
    </ReactErrorBoundary>
  </React.StrictMode>
);
