import { useState } from 'react';

import { FaChevronDown, FaCheck } from 'react-icons/fa6';

const filterGenre = [
  {
    label: 'All Genres',
    value: 'All Genres',
  },
  {
    label: 'Action',
    value: 'Action',
  },
  {
    label: 'Adventure',
    value: 'Adventure',
  },
  {
    label: 'Animation',
    value: 'Animation',
  },
  {
    label: 'Biography',
    value: 'Biography',
  },
  {
    label: 'Comedy',
    value: 'Comedy',
  },
  {
    label: 'Crime',
    value: 'Crime',
  },
  {
    label: 'Drama',
    value: 'Drama',
  },
  {
    label: 'Family',
    value: 'Family',
  },
  {
    label: 'Fantasy',
    value: 'Fantasy',
  },
  {
    label: 'History',
    value: 'History',
  },
  {
    label: 'Horror',
    value: 'Horror',
  },
  {
    label: 'Kids',
    value: 'Kids',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Mystery',
    value: 'Mystery',
  },
  {
    label: 'Psychological',
    value: 'Psychological',
  },
  {
    label: 'Romance',
    value: 'Romance',
  },
  {
    label: 'Sci-Fi',
    value: 'Sci-Fi',
  },
  {
    label: 'Sport',
    value: 'Sport',
  },
  {
    label: 'Thriller',
    value: 'Thriller',
  },
  {
    label: 'War',
    value: 'War',
  },
  {
    label: 'Western',
    value: 'Western',
  },
];

export default function GenreFilter({ selectedGenre, setSelectedGenre }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className='w-full max-w-[440px] h-auto flex flex-col gap-1.5 relative'>
      <p className='text-xs md:text-sm lg:text-base text-white font-medium tracking-wider md:tracking-wide'>
        Genre
      </p>

      <button
        type='button'
        onClick={() => setShowDropdown((currentValue) => !currentValue)}
        className='outline-none border border-neutral-500 cursor-pointer bg-transparent w-full h-auto flex items-center justify-between py-1.5 px-3 rounded-md shadow-sm text-gray-200 text-xs md:text-sm font-medium tracking-wider'
      >
        {selectedGenre}
        <span className='text-sm text-gray-400'>
          <FaChevronDown />
        </span>
      </button>

      {showDropdown && (
        <div className='w-full h-auto py-1 px-1 md:py-1 md:px-2 lg:py-1.5 lg:px-3 flex flex-col gap-1.5 border border-neutral-500 bg-neutral-800 absolute top-[calc(100%+6px)] left-0 rounded-md shadow-sm z-50'>
          {filterGenre.map((btn, index) => (
            <button
              type='button'
              key={index}
              onClick={() => {
                setSelectedGenre(btn.value);
                setShowDropdown(false);
              }}
              className={`group ${
                selectedGenre === btn.value
                  ? 'bg-neutral-50/10 shadow-sm'
                  : 'bg-transparent shadow-none'
              } outline-none border-none cursor-pointer w-full h-auto flex items-center justify-start gap-1 lg:gap-1.5 py-1 px-2 md:py-1.5 md:px-3 rounded-md text-xs md:text-sm text-gray-400 font-medium tracking-wider hover:text-white focus-visible:text-white hover:bg-neutral-50/25 focus-visible:bg-neutral-50/25 transition-all duration-500`}
            >
              {selectedGenre === btn.value ? (
                <span className='w-2.5 h-2.5 lg:w-4 lg:h-4 flex items-center justify-center'>
                  <FaCheck />
                </span>
              ) : (
                <span className='w-2.5 h-2.5 lg:w-4 lg:h-4 flex items-center justify-center' />
              )}
              {btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
