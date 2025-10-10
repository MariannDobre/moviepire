import { useUser } from '../hooks/auth/useUser';
import { Link } from 'react-router-dom';

import ConfirmedFallback from '../components/_confirm/ConfirmedFallback';
import NotConfirmedFallback from '../components/_confirm/NotConfirmedFallback';
import SmallLoader from '../components/loaders/SmallLoader';
import LazyImage from '../utils/LazyImage';

export default function ConfirmPage() {
  const { user, isAuthenticated, isFetching } = useUser();

  if (!isAuthenticated) {
    return (
      <LazyImage
        asBackground
        src='./authBg.jpg'
        gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        className='w-full h-[calc(100vh-72px)] flex items-center justify-center'
      >
        <div className='max-w-[calc(476px*2)] h-auto border border-neutral-700 bg-black/50 backdrop-blur-md p-9 flex flex-col items-center justify-center rounded-md'>
          <h6 className='w-full text-center text-white text-2xl font-medium tracking-wide mb-1.5'>
            Join to unlock all features
          </h6>

          <p className='w-full text-center text-neutral-400 text-lg font-normal tracking-wider mb-6'>
            You haven't created an account yet. To truly unlock the app
            potential you need to create an account verify the email.
            <br />
            Meanwhile, you can continue browsing the app as a guest.
          </p>

          <div className='w-full h-auto flex items-center justify-center gap-6'>
            <Link
              to='/login'
              className='outline-none border border-neutral-400 cursor-pointer w-64 h-auto py-2 px-4 flex items-center justify-center text-center rounded-md bg-transparent text-white text-base font-medium tracking-wider hover:bg-white/10 focus-visible::bg-white/10 transition-colors duration-300'
            >
              Login
            </Link>

            <Link
              to='/register'
              className='outline-none border border-neutral-400 cursor-pointer w-64 h-auto py-2 px-4 flex items-center justify-center text-center rounded-md bg-transparent text-white text-base font-medium tracking-wider hover:bg-white/10 focus-visible::bg-white/10 transition-colors duration-300'
            >
              Register
            </Link>
          </div>
        </div>
      </LazyImage>
    );
  }

  if (isFetching) {
    return (
      <div className='w-full h-[calc(100vh-72px)] p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Checking if there is any user session...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );
  }

  return (
    <LazyImage
      asBackground
      src='https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg'
      gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      className='w-full h-[calc(100vh-72px)] flex flex-col items-center justify-center'
    >
      {user?.email_confirmed_at ? (
        <ConfirmedFallback username={user?.user_metadata?.username} />
      ) : (
        <NotConfirmedFallback />
      )}
    </LazyImage>
  );
}
