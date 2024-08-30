import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './interface/Layout';
import MoviesDetails from './pages/moviesDetails';
import ViewlistPage from './pages/viewlistPage';
import Login from './auth/login';
import Signup from './auth/signup';
import Signout from './auth/signout';
import AccountSettings from './pages/accountSettings';
import ConfirmEmail from './pages/confirmEmail';
import PageNotFound from './pages/pageNotFound';
import HomePage from './pages/HomePage';
import Discovery from './pages/Discovery';
import AboutMovie from './pages/AboutMovie';
import MovieTrailer from './pages/MovieTrailer';

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
            element={<Layout />}
          >
            <Route
              index
              element={<HomePage />}
            />

            <Route
              path='/discovery'
              element={<Discovery />}
            />

            <Route
              path='/about/:movieId'
              element={<AboutMovie />}
            />

            <Route
              path='/trailer-for/:movieId'
              element={<MovieTrailer />}
            />
          </Route>

          {/* <Route
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
          /> */}

          <Route
            path='*'
            element={<PageNotFound />}
          />
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
