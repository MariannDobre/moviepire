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
    <div className='w-[440px] h-auto flex flex-col gap-1.5 relative'>
      <p className='text-base text-white font-medium tracking-wide'>Type</p>

      <button
        type='button'
        onClick={() => setShowDropdown((currentValue) => !currentValue)}
        className='outline-none border border-neutral-500 cursor-pointer bg-transparent w-full h-auto flex items-center justify-between py-1.5 px-3 rounded-md shadow-sm text-gray-200 text-sm font-medium tracking-wider'
      >
        {capitalizeWords(selectedType)}
        <span className='text-sm text-gray-400'>
          <FaChevronDown />
        </span>
      </button>

      {showDropdown && (
        <div className='w-full h-auto py-1.5 px-3 flex flex-col gap-1.5 border border-neutral-500 bg-neutral-800 absolute top-[calc(100%+6px)] left-0 rounded-md shadow-sm z-50'>
          {filterType.map((btn, index) => (
            <button
              type='button'
              key={index}
              onClick={() => {
                setSelectedType(btn.value);
                setShowDropdown(false);
              }}
              className={`group ${
                selectedType === btn.value
                  ? 'bg-neutral-50/10 shadow-sm'
                  : 'bg-transparent shadow-none'
              } outline-none border-none cursor-pointer w-full h-auto flex items-center justify-start gap-1.5 py-1.5 px-3 rounded-md text-sm text-gray-400 font-medium tracking-wider hover:text-white focus-visible:text-white hover:bg-neutral-50/25 focus-visible:bg-neutral-50/25 transition-all duration-500`}
            >
              {selectedType === btn.value ? (
                <span className='w-4 h-4 flex items-center justify-center'>
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
