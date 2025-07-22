import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';

import FilterPanel from './FilterPanel';
import DiaryMoviesList from './DiaryMoviesList';

export default function DiaryPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedYearRange, setSelectedYearRange] = useState('All Years');

  if (!isAuthenticated) {
    return (
      <div
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
        className='w-full h-[calc(100vh-80px-48px-48px)] flex flex-col items-center justify-center gap-3'
      >
        <div className='w-full max-w-[760px] h-auto p-6 flex flex-col items-center justify-center gap-3 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'>
          <p className='text-white text-lg font-medium tracking-wider text-center'>
            To fully engage with this page and unlock the complete features of
            the app, please log in with your verified account.
          </p>

          <div className='w-full max-w-[760px] flex items-center justify-between gap-3'>
            <button
              type='button'
              onClick={() => navigate('/')}
              className='w-full h-auto outline-none border-none cursor-pointer flex items-center justify-center text-center text-white text-base font-normal tracking-wide bg-blue-400 py-1.5 px-6 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
            >
              Home Page
            </button>

            <button
              type='button'
              onClick={() => navigate('/login')}
              className='w-full h-auto outline-none border-none cursor-pointer flex items-center justify-center text-center text-white text-base font-normal tracking-wide bg-blue-400 py-1.5 px-6 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-auto flex flex-col items-center gap-9'>
      <div className='w-full h-auto flex flex-col gap-1'>
        <h6 className='text-2xl text-white font-medium tracking-wide'>
          Your private diary
        </h6>

        <p className='text-base text-gray-400 font-normal tracking-wider'>
          Your personal collection of watched movies and shows
        </p>
      </div>

      <div className='w-full h-auto flex flex-col items-center gap-3 md:gap-6 p-3 md:p-6 bg-neutral-50/10 border border-neutral-500 rounded-md lg:rounded-lg shadow-sm'>
        <h6 className='text-base md:text-lg text-blue-400 font-medium tracking-wider self-start'>
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
