import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './interface/Layout';
import Login from './pages/Login';
import ConfirmEmail from './pages/confirmEmail';
import PageNotFound from './pages/pageNotFound';
import HomePage from './pages/HomePage';
import Discovery from './pages/Discovery';
import AboutMovie from './pages/AboutMovie';
import MovieTrailer from './pages/MovieTrailer';
import AboutApp from './pages/AboutApp';
import CreateAccount from './pages/CreateAccount';
import AccountSettings from './pages/AccountSettings';
import ViewlistPageWrapper from './pages/ViewlistPage';

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
              path='/about-app'
              element={<AboutApp />}
            />

            <Route
              path='/discovery'
              element={<Discovery />}
            />

            <Route
              path='/log-into-account'
              element={<Login />}
            />

            <Route
              path='/register-account'
              element={<CreateAccount />}
            />

            <Route
              path='/account-settings'
              element={<AccountSettings />}
            />

            <Route
              path='/about/:movieId'
              element={<AboutMovie />}
            />

            <Route
              path='/trailer-for/:movieId'
              element={<MovieTrailer />}
            />

            <Route
              path='/viewlist'
              element={<ViewlistPageWrapper />}
            />
          </Route>

          {/* 

         

        

          <Route
            path='/confirm-email'
            element={<ConfirmEmail />}
          />

           */}

          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '12px' }}
        toastOptions={{
          success: {
            duration: 6500,
          },
          error: {
            duration: 6500,
          },
          style: {
            fontSize: '16px',
            maxWidth: '720px',
            textAlign: 'center',
            padding: '12px',
            backgroundColor: '#1a1a1a',
            color: 'rgb(231 229 228)',
            borderRadius: '6px',
            letterSpacing: '1px',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
