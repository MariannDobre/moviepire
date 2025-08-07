import React, { startTransition, useState } from 'react';
import { useClickOutside } from '../../hooks/assets/useClickOutside';
import { FaSearch } from 'react-icons/fa';
import Results from './Results';

function SearchMovie() {
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { containerRef: searchInputRef } = useClickOutside(() =>
    setIsInputFocused(false)
  );
  const inputRect = searchInputRef?.current?.getBoundingClientRect();

  return (
    <React.Fragment>
      <label
        htmlFor='search-movie'
        className='relative group w-auto h-8 bg-neutral-800 flex items-center rounded-md shadow-sm'
      >
        <span className='absolute top-1/2 left-2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none group-hover:text-blue-400 group-focus-within:text-blue-400 transition-all duration-500'>
          <FaSearch />
        </span>

        <input
          ref={searchInputRef}
          className='w-44 group-hover:w-56 focus-visible:w-56 sm:w-48 sm:group-hover:w-64 sm:focus-visible:w-64 md:w-56 md:group-hover:w-72 md:focus-visible:w-72 lg:w-64 lg:group-hover:w-80 lg:focus-visible:w-80 xl:w-72 xl:group-hover:w-[352px] xl:focus-visible:w-[352px] 2xl:w-80 2xl:group-hover:w-[384px] 2xl:focus-visible:w-[384px] outline-none border border-transparent bg-neutral-800 h-8 pr-2 pl-8 placeholder:text-neutral-500 placeholder:font-normal placeholder:tracking-wide placeholder:text-sm caret-blue-400 text-sm text-white font-normal tracking-wide rounded-md shadow-none group-hover:border-blue-400 focus-visible:border-blue-400 selection:bg-blue-400 selection:text-white transition-all duration-500'
          type='text'
          id='search-movie'
          name='search-movie'
          placeholder='Search moviepire'
          autoComplete='off'
          aria-label='Search for movie/series title'
          minLength={1}
          maxLength={100}
          value={query}
          onChange={(e) => startTransition(() => setQuery(e.target.value))}
          onFocus={() => setIsInputFocused(true)}
        />
      </label>

      <Results
        query={query}
        setQuery={setQuery}
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        inputRect={inputRect}
      />
    </React.Fragment>
  );
}

export default SearchMovie;
