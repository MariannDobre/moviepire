import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './interface/Layout';
import LoginPage from './pages/LoginPage';
import ConfirmEmail from './pages/ConfirmEmail';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import MovieTrailerPage from './components/_trailerpage/MovieTrailerPage';
import MoviePage from './components/_aboutmovie/MoviePage';
import AboutPage from './components/_aboutpage/AboutPage';
import RegisterPage from './pages/RegisterPage';
import ClipPage from './components/_clippage/ClipPage';
import DiaryPage from './components/_diary/DiaryPage';
import Account from './pages/Account';

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
              path='/login'
              element={<LoginPage />}
            />

            <Route
              path='/register'
              element={<RegisterPage />}
            />

            <Route
              path='/about-moviepire'
              element={<AboutPage />}
            />

            <Route
              path='/about/:movieId'
              element={<MoviePage />}
            />

            <Route
              path='/trailer-for/:movieId'
              element={<MovieTrailerPage />}
            />

            <Route
              path='/clip-for/:movieId'
              element={<ClipPage />}
            />

            <Route
              path='/account'
              element={<Account />}
            />

            <Route
              path='/confirm-email'
              element={<ConfirmEmail />}
            />

            <Route
              path='/diary'
              element={<DiaryPage />}
            />
          </Route>

          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position='bottom-right'
        // gutter={12}
        // containerStyle={{ margin: '12px' }}
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
            backgroundColor: 'oklch(20.5% 0 0)',
            color: '#fff',
            borderRadius: '6px',
            letterSpacing: '1px',
            wordSpacing: '0.25px',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
