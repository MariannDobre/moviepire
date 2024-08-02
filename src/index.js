import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import App from './App';
import FallbackMessage from './interface/fallbackMsg';
import Loader from './components/loaders/loader';

import styled from 'styled-components';
import { BsExclamationCircleFill } from 'react-icons/bs';
import './index.css';

const StyledErrorComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  background-color: var(--color-black-light);
  height: 100dvh;
`;

const ErrorHeading = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--color-main-600);
  font-size: var(--font-size-2xl);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-sm);

  svg {
    color: var(--color-main-800);
  }
`;

const ErrorBody = styled.span`
  color: var(--color-gray);
  font-size: var(--font-size-base);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

const RetryButton = styled.button`
  outline: none;
  border: none;
  color: var(--color-white);
  background-color: var(--color-main-600);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) var(--padding-lg);
  letter-spacing: var(--letter-spacing-sm);
  word-spacing: var(--word-spacing-xs);
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;

function FallbackError({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <StyledErrorComponent role='alert'>
      <ErrorHeading>
        <BsExclamationCircleFill />
        Something went wrong:
      </ErrorHeading>

      <ErrorBody>{error?.message}</ErrorBody>

      <RetryButton onClick={resetErrorBoundary}>Try again</RetryButton>
    </StyledErrorComponent>
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
          <FallbackMessage>
            <Loader />
          </FallbackMessage>
        }
      >
        <App />
      </Suspense>
    </ReactErrorBoundary>
  </React.StrictMode>
);
