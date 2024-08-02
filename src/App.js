import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppLayout from './interface/appLayout';
import MoviesDetails from './pages/moviesDetails';
import Main from './components/main/main';
import MoviesTrailer from './pages/moviesTrailer';
import ViewlistPage from './pages/viewlistPage';
import Login from './auth/login';
import Signup from './auth/signup';
import Signout from './auth/signout';
import AccountSettings from './pages/accountSettings';
import ConfirmEmail from './pages/confirmEmail';
import PageNotFound from './pages/pageNotFound';
import Test from './components/test';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<AppLayout />}
          >
            <Route
              index
              element={<Main />}
            />

            <Route
              path='/title-id/:movieId'
              element={<MoviesDetails />}
            />

            <Route
              path='/title-id/:movieId/trailer-id/:titleName'
              element={<MoviesTrailer />}
            />

            <Route
              path='/login'
              element={<Login />}
            />

            <Route
              path='/signup'
              element={<Signup />}
            />

            <Route
              path='/signout'
              element={<Signout />}
            />

            <Route
              path='/settings'
              element={<AccountSettings />}
            />

            <Route
              path='/confirm-email'
              element={<ConfirmEmail />}
            />

            <Route
              path='/viewlist'
              element={<ViewlistPage />}
            />

            <Route
              path='*'
              element={<PageNotFound />}
            />

            <Route
              path='/test'
              element={<Test />}
            />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: 'var(--margin-sm)' }}
        toastOptions={{
          success: {
            duration: 3500,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: 'var(--font-size-base)',
            maxWidth: '64rem',
            textAlign: 'center',
            padding: 'var(--padding-md) var(--padding-xl)',
            backgroundColor: 'var(--color-black-light)',
            color: 'var(--color-white)',
            borderRadius: 'calc(var(--border-rounded-xs) / 2)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
