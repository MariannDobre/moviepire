import { useState, startTransition } from 'react';

import Results from './Results';

import { FaSearch } from 'react-icons/fa';

function SearchMovie({ onCloseModal }) {
  const [query, setQuery] = useState('');

  return (
    <div className='w-[calc(876px-48px-2px)] h-[calc(524px-48px-32px-24px-2px)] flex flex-col gap-3'>
      <label
        htmlFor='search-movie'
        className='w-full h-auto relative bg-transparent rounded-md'
      >
        <span className='text-neutral-400 text-sm absolute top-1/2 left-3 -translate-y-1/2 cursor-text'>
          <FaSearch />
        </span>

        <input
          id='search-movie'
          name='search-movie'
          type='text'
          placeholder='Search Moviepire'
          aria-label='Search for movie - series title'
          title='Search for movie - series title'
          autoComplete='off'
          value={query}
          onChange={(e) => startTransition(() => setQuery(e.target.value))}
          className='outline-none border border-neutral-700 w-full h-auto bg-transparent py-1.5 pl-9 pr-3 rounded-md placeholder:text-neutral-400 placeholder:text-sm placeholder:font-normal placeholder:tracking-wider caret-amber-400 text-neutral-200 text-sm font-normal tracking-wider hover:border-neutral-500 focus-visible:border-neutral-500 transition-colors duration-300'
        />
      </label>

      <Results
        query={query}
        onQuery={setQuery}
        onCloseModal={onCloseModal}
      />
    </div>
  );
}

export default SearchMovie;
