import { useUser } from '../hooks/auth/useUser';
import { Link } from 'react-router-dom';

import SectionHeader from '../components/_home-page/SectionHeader';
import StatsContainer from '../components/_stats-page/StatsContainer';
import Banner from '../components/_banner/Banner';
import LazyImage from '../utils/LazyImage';
import SmallLoader from '../interface/_loaders/SmallLoader';

export default function StatsPage() {
  const { user, isFetching, isAuthenticated } = useUser();

  if (!isAuthenticated || !user?.email_confirmed_at) {
    return (
      <LazyImage
        asBackground
        src='https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg'
        gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        className='w-full h-[calc(100vh-72px)] flex items-center justify-center'
      >
        <div className='max-w-[calc(476px*2)] h-auto border border-neutral-700 bg-black/50 backdrop-blur-md p-9 flex flex-col items-center justify-center rounded-md'>
          <h6 className='w-full text-center text-white text-2xl font-medium tracking-wide mb-1.5'>
            Oops, something's missing...
          </h6>

          <p className='w-full text-center text-neutral-400 text-lg font-normal tracking-wider mb-6'>
            This page is available only to authenticated users. Please sign in
            with a verified account to proceed.
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
          Checking your credentials...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );
  }

  return (
    <div className='w-full h-[calc(100vh-72px)] flex flex-col gap-9'>
      <div className='w-full h-[62px] flex items-center gap-6'>
        <div className='w-14 h-14 flex items-center justify-center rounded-full'>
          {user?.user_metadata?.avatar ? (
            <img
              className='w-full h-full object-cover rounded-full'
              src={user?.user_metadata?.avatar}
              alt='User avatar'
            />
          ) : (
            <span className='w-14 h-14 flex items-center justify-center rounded-full bg-neutral-700 text-white text-2xl font-medium'>
              {user?.user_metadata?.username.trim().at(0).toUpperCase()}
            </span>
          )}
        </div>

        <SectionHeader
          title='Your Watch Journey'
          subtitle='Dive into your ratings, categories, and viewing patterns'
        />
      </div>

      <StatsContainer userID={user?.id} />

      <Banner />
    </div>
  );
}
