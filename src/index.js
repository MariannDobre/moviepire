import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import App from './App';
import PageLoader from './components/loaders/PageLoader';
import ErrorFallback from './interface/ErrorFallback';

import { BsExclamationCircleFill } from 'react-icons/bs';
import './index.css';

function FallbackError({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <section
      style={{
        background: `
                radial-gradient(
                 circle,
                 rgba(0, 0, 0, 0) 25%,
                 rgba(0, 0, 0, 1) 95%
                ),
                linear-gradient(
                 to bottom,
                 rgba(0, 0, 0, 1),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.2),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 1)
                ),
                url(authBg.jpg) no-repeat center / cover
              `,
      }}
      className='w-screen h-screen bg-black flex flex-col items-center justify-center'
      role='alert'
    >
      <div className='w-full max-w-[640px] h-auto flex flex-col items-center justify-center gap-3 p-6 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'>
        <h1 className='w-full flex items-center justify-center gap-1.5 text-xl text-red-500 font-medium tracking-wide text-center'>
          <span className='text-2xl'>
            <BsExclamationCircleFill />
          </span>
          Something went wrong:
        </h1>

        <p className='w-full text-base text-white font-normal tracking-wide text-center'>
          {error?.message}
        </p>

        <button
          onClick={resetErrorBoundary}
          className='outline-none border-none cursor-pointer w-full h-auto flex items-center justify-center bg-red-400 text-center text-sm text-white font-medium tracking-wider rounded-md shadow-sm py-1.5 px-6 hover:bg-red-500 focus-visible:bg-red-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
        >
          Try Again
        </button>
      </div>
    </section>
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
