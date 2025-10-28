import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';

import FilterPanel from '../components/_diary-page/FilterPanel';
import DiaryMoviesList from '../components/_diary-page/DiaryMoviesList';
import LazyImage from '../utils/LazyImage';
import SmallLoader from '../interface/_loaders/SmallLoader';
import SectionHeader from '../components/_home-page/SectionHeader';

export default function DiaryPage() {
  const { user, isAuthenticated } = useUser();

  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedYearRange, setSelectedYearRange] = useState('All Years');

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
        <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-md bg-black/50 backdrop-blur-md border border-neutral-700'>
          <div className='w-full h-auto flex flex-col items-center gap-1.5'>
            <h6 className='w-full h-auto text-white text-2xl font-medium tracking-wide text-center'>
              Oops, something's missing...
            </h6>

            <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide text-center'>
              This page is available only to authenticated users. Please sign in
              with a verified account to proceed.
            </p>
          </div>

          <div className='w-full h-auto flex items-center justify-center gap-6'>
            <Link
              to='/login'
              aria-label='Forward to login page'
              className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer py-1.5 px-6 bg-amber-400 text-black text-base font-medium tracking-wide rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
            >
              Login
            </Link>

            <Link
              to='/register'
              aria-label='Forward to register page'
              className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer py-1.5 px-6 bg-amber-400 text-black text-base font-medium tracking-wide rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
            >
              Register
            </Link>
          </div>
        </div>
      </LazyImage>
    );
  }

  return (
    <div className='w-full h-auto flex flex-col items-center gap-6'>
      <SectionHeader
        title='Your private diary'
        subtitle='Your personal collection of watched movies and shows'
      />

      <div className='w-full h-auto flex flex-col items-center gap-1.5 p-6 bg-transparent border border-neutral-700 rounded-md'>
        <h6 className='text-amber-400 text-xl font-medium tracking-wide self-start'>
          Filters
        </h6>

        <FilterPanel
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedYearRange={selectedYearRange}
          setSelectedYearRange={setSelectedYearRange}
        />
      </div>

      <DiaryMoviesList
        selectedGenre={selectedGenre}
        selectedType={selectedType}
        selectedYearRange={selectedYearRange}
      />
    </div>
  );
}
