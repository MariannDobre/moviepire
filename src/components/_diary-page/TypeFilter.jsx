import { useState } from 'react';
import { capitalizeWords } from '../../utils/functions';

import { FaChevronDown, FaCheck } from 'react-icons/fa6';

const filterType = [
  {
    label: 'All Types',
    value: 'All Types',
  },
  {
    label: 'Movie',
    value: 'movie',
  },
  {
    label: 'TV Show',
    value: 'tv show',
  },
  {
    label: 'Animation',
    value: 'animation',
  },
];

export default function TypeFilter({ selectedType, setSelectedType }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className='w-full max-w-[440px] h-auto flex flex-col gap-1.5 relative'>
      <p className='text-base text-neutral-100 font-medium tracking-wide'>
        Type
      </p>

      <button
        type='button'
        aria-label='Choose your type filter'
        onClick={() => setShowDropdown((currentValue) => !currentValue)}
        className='outline-none border border-neutral-700 cursor-pointer bg-transparent w-full h-auto flex items-center justify-between py-1.5 px-3 rounded-md text-neutral-200 text-sm font-medium tracking-wider'
      >
        {capitalizeWords(selectedType)}
        <span className='text-sm text-neutral-400'>
          <FaChevronDown />
        </span>
      </button>

      {showDropdown && (
        <div className='w-full h-auto p-1.5 flex flex-col gap-1.5 border border-neutral-700 bg-black/50 backdrop-blur-md absolute top-[calc(100%+6px)] left-0 rounded-md z-50'>
          {filterType.map((btn, index) => (
            <button
              key={index}
              type='button'
              aria-label={`Select ${btn.value} type`}
              onClick={() => {
                setSelectedType(btn.value);
                setShowDropdown(false);
              }}
              className={`group ${
                selectedType === btn.value
                  ? 'bg-white/20 text-neutral-200'
                  : 'bg-transparent text-neutral-400'
              } outline-none border-none cursor-pointer w-full h-auto flex items-center justify-start gap-1.5 py-1.5 px-3 rounded-sm text-sm font-medium tracking-wider hover:text-neutral-100 hover:bg-white/25 focus-visible:text-neutral-100 focus-visible:bg-white/25 transition-colors duration-300`}
            >
              {selectedType === btn.value ? (
                <span
                  className={`w-4 h-4 flex items-center justify-center ${
                    selectedType === btn.value && 'text-amber-400'
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
