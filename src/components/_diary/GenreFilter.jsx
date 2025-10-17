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
      <p className='text-base text-neutral-100 font-medium tracking-wide'>
        Genre
      </p>

      <button
        type='button'
        aria-label='Choose your genre filter'
        onClick={() => setShowDropdown((currentValue) => !currentValue)}
        className='outline-none border border-neutral-700 cursor-pointer bg-transparent w-full h-auto flex items-center justify-between py-1.5 px-3 rounded-md text-neutral-200 text-sm font-medium tracking-wider'
      >
        {selectedGenre}
        <span className='text-sm text-neutral-400'>
          <FaChevronDown />
        </span>
      </button>

      {showDropdown && (
        <div className='w-full h-auto p-1.5 flex flex-col gap-1.5 border border-neutral-700 bg-black/50 backdrop-blur-md absolute top-[calc(100%+6px)] left-0 rounded-md z-50'>
          {filterGenre.map((btn, index) => (
            <button
              key={index}
              type='button'
              aria-label={`Select ${btn.value} genre`}
              onClick={() => {
                setSelectedGenre(btn.value);
                setShowDropdown(false);
              }}
              className={`group ${
                selectedGenre === btn.value
                  ? 'bg-white/20 text-neutral-200'
                  : 'bg-transparent text-neutral-400'
              } outline-none border-none cursor-pointer w-full h-auto flex items-center justify-start gap-1.5 py-1.5 px-3 rounded-sm text-sm font-medium tracking-wider hover:text-neutral-100 hover:bg-white/25 focus-visible:text-neutral-100 focus-visible:bg-white/25 transition-colors duration-300`}
            >
              {selectedGenre === btn.value ? (
                <span
                  className={`w-4 h-4 flex items-center justify-center ${
                    selectedGenre === btn.value && 'text-amber-400'
                  } group-hover:text-amber-500 group-focus-visible:text-amber-500 transition-colors duration-300`}
                >
                  <FaCheck />
                </span>
              ) : (
                <span className='w-4 h-4 flex items-center justify-center' />
              )}
              {btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
