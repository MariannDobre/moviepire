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
      <p className='text-base text-neutral-100 font-medium tracking-wide'>
        Year
      </p>

      <button
        type='button'
        aria-label='Choose your year filter'
        onClick={() => setShowDropdown((currentValue) => !currentValue)}
        className='outline-none border border-neutral-700 cursor-pointer bg-transparent w-full h-auto flex items-center justify-between py-1.5 px-3 rounded-md text-neutral-200 text-sm font-medium tracking-wider'
      >
        {getDisplayText(selectedYearRange)}
        <span className='text-sm text-neutral-400'>
          <FaChevronDown />
        </span>
      </button>

      {showDropdown && (
        <div className='w-full h-auto p-1.5 flex flex-col gap-1.5 border border-neutral-700 bg-black/50 backdrop-blur-md absolute top-[calc(100%+6px)] left-0 rounded-md z-50'>
          {filterYear.map((btn, index) => (
            <button
              key={index}
              type='button'
              aria-label={`Select ${btn.value} year`}
              onClick={() => {
                setSelectedYearRange(btn.value);
                setShowDropdown(false);
              }}
              className={`group ${
                isYearRangeEqual(selectedYearRange, btn.value)
                  ? 'bg-white/20 text-neutral-200'
                  : 'bg-transparent text-neutral-400'
              } outline-none border-none cursor-pointer w-full h-auto flex items-center justify-start gap-1.5 py-1.5 px-3 rounded-sm text-sm font-medium tracking-wider hover:text-neutral-100 hover:bg-white/25 focus-visible:text-neutral-100 focus-visible:bg-white/25 transition-colors duration-300`}
            >
              {isYearRangeEqual(selectedYearRange, btn.value) ? (
                <span
                  className={`w-4 h-4 flex items-center justify-center ${
                    isYearRangeEqual(selectedYearRange, btn.value) &&
                    'text-amber-400'
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
