import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className='flex items-center'>
      {options.map((option) => (
        <button
          key={option.value}
          className={`text-lg p-1.5 rounded-full bg-transparent ${
            filterBy === option.value ? 'text-red-400' : 'text-stone-400'
          } ${
            filterBy === option.value
              ? 'hover:bg-red-700/10'
              : 'hover:text-stone-200 hover:bg-stone-400/10'
          } border-none outline-none`}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
