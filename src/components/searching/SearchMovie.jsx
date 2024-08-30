import React, { startTransition, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FaSearch } from 'react-icons/fa';
import Results from './Results';

function SearchMovie() {
  // state to track the desired movie/title/item
  const [query, setQuery] = useState('');
  // state to track the focus state of the input and to conditionally render the results
  const [isInputFocused, setIsInputFocused] = useState(false);
  // custom hook call to close the results and to turn to false the focus state of the input by clicking outside
  const { containerRef: searchInputRef } = useClickOutside(() =>
    setIsInputFocused(false)
  );
  //  derived state based on the input ref to get dynamically the input dimensions
  const inputRect = searchInputRef?.current?.getBoundingClientRect();

  return (
    <React.Fragment>
      <label
        htmlFor='search-movie'
        className='bg-neutral-800 relative flex items-center rounded-md'
      >
        <span className='text-sm text-neutral-400/50 absolute left-2 pr-2 pointer-events-none'>
          <FaSearch />
        </span>

        <input
          ref={searchInputRef}
          className='group bg-transparent text-stone-200 text-base caret-red-400 placeholder-neutral-400/50 w-64 py-1 pr-2 pl-8 rounded-md tracking-wide border-none outline outline-1 outline-transparent focus-visible:w-96 focus-visible:outline-red-400 transition-all duration-500'
          type='text'
          id='search-movie'
          name='search-movie'
          placeholder='Search moviepire'
          autoComplete='off'
          aria-label='Search movie/series title'
          minLength={1}
          maxLength={100}
          value={query}
          onChange={(e) => startTransition(() => setQuery(e.target.value))}
          onFocus={() => setIsInputFocused(true)}
        />
      </label>

      <Results
        query={query}
        isInputFocused={isInputFocused}
        inputRect={inputRect}
      />
    </React.Fragment>
  );
}

export default SearchMovie;
