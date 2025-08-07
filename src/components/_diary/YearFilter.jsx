import { useState } from 'react';

import { FaChevronDown, FaCheck } from 'react-icons/fa6';

const filterYear = [
  {
    label: 'All Years',
    value: 'All Years',
  },
  {
    label: '1980-1989',
    value: { startYear: 1980, endYear: 1989 },
  },
  {
    label: '1990-1999',
    value: { startYear: 1990, endYear: 1999 },
  },
  {
    label: '2000-2009',
    value: { startYear: 2000, endYear: 2009 },
  },
  {
    label: '2010-2019',
    value: { startYear: 2010, endYear: 2019 },
  },
  {
    label: '2020-2029',
    value: { startYear: 2020, endYear: 2029 },
  },
];

export default function YearFilter({
  selectedYearRange,
  setSelectedYearRange,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to get display text for selected year range
  const getDisplayText = (yearRange) => {
    if (typeof yearRange === 'string') {
      return yearRange; // For "All Years"
    }
    if (
      typeof yearRange === 'object' &&
      yearRange.startYear &&
      yearRange.endYear
    ) {
      return `${yearRange.startYear}-${yearRange.endYear}`;
    }
    return 'All Years';
  };

  // Function to check if two year ranges are equal
  const isYearRangeEqual = (range1, range2) => {
    if (range1 === range2) return true;
    if (typeof range1 === 'object' && typeof range2 === 'object') {
      return (
        range1.startYear === range2.startYear &&
        range1.endYear === range2.endYear
      );
    }
    return false;
  };

  return (
    <div className='w-full max-w-[440px] h-auto flex flex-col gap-1.5 relative'>
      <p className='text-xs md:text-sm lg:text-base text-white font-medium tracking-wider md:tracking-wide'>
        Year
      </p>

      <button
        type='button'
        onClick={() => setShowDropdown((currentValue) => !currentValue)}
        className='outline-none border border-neutral-500 cursor-pointer bg-transparent w-full h-auto flex items-center justify-between py-1.5 px-3 rounded-md shadow-sm text-gray-200 text-xs md:text-sm font-medium tracking-wider'
      >
        {getDisplayText(selectedYearRange)}
        <span className='text-sm text-gray-400'>
          <FaChevronDown />
        </span>
      </button>

      {showDropdown && (
        <div className='w-full h-auto py-1 px-1 md:py-1 md:px-2 lg:py-1.5 lg:px-3 flex flex-col gap-1.5 border border-neutral-500 bg-neutral-800 absolute top-[calc(100%+6px)] left-0 rounded-md shadow-sm z-50'>
          {filterYear.map((btn, index) => (
            <button
              type='button'
              key={index}
              onClick={() => {
                setSelectedYearRange(btn.value);
                setShowDropdown(false);
              }}
              className={`group ${
                isYearRangeEqual(selectedYearRange, btn.value)
                  ? 'bg-neutral-50/10 shadow-sm'
                  : 'bg-transparent shadow-none'
              } outline-none border-none cursor-pointer w-full h-auto flex items-center justify-start gap-1 lg:gap-1.5 py-1 px-2 md:py-1.5 md:px-3 rounded-md text-xs md:text-sm text-gray-400 font-medium tracking-wider hover:text-white focus-visible:text-white hover:bg-neutral-50/25 focus-visible:bg-neutral-50/25 transition-all duration-500`}
            >
              {isYearRangeEqual(selectedYearRange, btn.value) ? (
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
