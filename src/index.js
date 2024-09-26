import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import App from './App';
import PageLoader from './components/loaders/PageLoader';
import { BsExclamationCircleFill } from 'react-icons/bs';
import './index.css';
import ErrorFallback from './interface/ErrorFallback';

function FallbackError({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div
      className='h-screen bg-black'
      role='alert'
    >
      <h1 className='text-red-50'>
        <BsExclamationCircleFill />
        Something went wrong:
      </h1>

      <p className='text-red-100'>{error?.message}</p>

      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReactErrorBoundary
      FallbackComponent={FallbackError}
      onReset={() => window.location.replace('/')}
    >
      <Suspense
        fallback={
          <ErrorFallback>
            <PageLoader />
          </ErrorFallback>
        }
      >
        <App />
      </Suspense>
    </ReactErrorBoundary>
  </React.StrictMode>
);
